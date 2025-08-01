// Configuration for Jira instance and authentication
module.exports = {
  // Jira instance configuration
  jira: {
    hostname: process.env.JIRA_HOSTNAME || 'your-jira-instance.atlassian.net',
    username: process.env.JIRA_USERNAME || 'your-email@example.com',
    apiToken: process.env.JIRA_API_TOKEN || 'your-api-token',
    protocol: 'https'
  },
  
  // Server configuration
  server: {
    port: process.env.PORT || 3000,
    host: process.env.HOST || '0.0.0.0'
  },
  
  // Validation settings
  validation: {
    maxResults: 1000, // Maximum number of issues to check
    timeout: 30000    // API call timeout in milliseconds
  }
}; 