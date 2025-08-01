const https = require('https');
const config = require('./config');

function validateHandler(req, res) {
  // Parse the request body
  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });
  
  req.on('end', () => {
    try {
      const data = JSON.parse(body);
      const { issue, configuration } = data;
      
      // Extract JQL from configuration
      const jql = configuration && configuration.jql;
      
      if (!jql) {
        return res.json({
          valid: false,
          message: 'JQL configuration is missing'
        });
      }
      
      // Get linked issues
      getLinkedIssues(issue.key, (linkedIssues) => {
        if (linkedIssues.length === 0) {
          return res.json({
            valid: false,
            message: 'No linked issues found'
          });
        }
        
        // Check if any linked issue matches the JQL
        checkJQLForIssues(linkedIssues, jql, (matchingIssues) => {
          if (matchingIssues.length > 0) {
            // At least one linked issue matches the JQL
            res.json({
              valid: true,
              message: `Found ${matchingIssues.length} linked issue(s) that match the JQL: ${jql}`
            });
          } else {
            // No linked issues match the JQL
            res.json({
              valid: false,
              message: `None of the linked issues match the JQL: ${jql}`
            });
          }
        });
      });
      
    } catch (error) {
      console.error('Error parsing request:', error);
      res.status(400).json({
        valid: false,
        message: 'Invalid request format'
      });
    }
  });
}

function getLinkedIssues(issueKey, callback) {
  // Make API call to Jira to get linked issues
  const auth = Buffer.from(`${config.jira.username}:${config.jira.apiToken}`).toString('base64');
  
  const options = {
    hostname: config.jira.hostname,
    path: `/rest/api/2/issue/${issueKey}?expand=issuelinks`,
    method: 'GET',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/json'
    },
    timeout: config.validation.timeout
  };
  
  const req = https.request(options, (res) => {
    let data = '';
    
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      try {
        const issueData = JSON.parse(data);
        const linkedIssues = [];
        
        // Extract linked issues from the response
        if (issueData.fields && issueData.fields.issuelinks) {
          issueData.fields.issuelinks.forEach(link => {
            if (link.outwardIssue) {
              linkedIssues.push(link.outwardIssue.key);
            }
            if (link.inwardIssue) {
              linkedIssues.push(link.inwardIssue.key);
            }
          });
        }
        
        callback(linkedIssues);
      } catch (error) {
        console.error('Error parsing linked issues response:', error);
        callback([]);
      }
    });
  });
  
  req.on('error', (error) => {
    console.error('Error getting linked issues:', error);
    callback([]);
  });
  
  req.on('timeout', () => {
    console.error('Timeout getting linked issues');
    req.destroy();
    callback([]);
  });
  
  req.end();
}

function checkJQLForIssues(issueKeys, jql, callback) {
  if (issueKeys.length === 0) {
    return callback([]);
  }
  
  // Create JQL query to check if any of the linked issues match the provided JQL
  const searchJQL = `issue in (${issueKeys.join(',')}) AND (${jql})`;
  const auth = Buffer.from(`${config.jira.username}:${config.jira.apiToken}`).toString('base64');
  
  const options = {
    hostname: config.jira.hostname,
    path: `/rest/api/2/search?jql=${encodeURIComponent(searchJQL)}&maxResults=${config.validation.maxResults}`,
    method: 'GET',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/json'
    },
    timeout: config.validation.timeout
  };
  
  const req = https.request(options, (res) => {
    let data = '';
    
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      try {
        const searchResults = JSON.parse(data);
        const matchingIssues = searchResults.issues || [];
        
        callback(matchingIssues.map(issue => issue.key));
      } catch (error) {
        console.error('Error parsing JQL search response:', error);
        callback([]);
      }
    });
  });
  
  req.on('error', (error) => {
    console.error('Error checking JQL for issues:', error);
    callback([]);
  });
  
  req.on('timeout', () => {
    console.error('Timeout checking JQL for issues');
    req.destroy();
    callback([]);
  });
  
  req.end();
}

module.exports = {
  validateHandler
}; 