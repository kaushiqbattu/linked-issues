const express = require('express');
const { validateHandler } = require('./validate.js');
const config = require('./config');
const path = require('path');

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Add logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Serve static HTML files
app.get('/create.html', (req, res) => {
  console.log('Serving create.html');
  res.sendFile(path.join(__dirname, 'create.html'));
});

app.get('/view.html', (req, res) => {
  console.log('Serving view.html');
  res.sendFile(path.join(__dirname, 'view.html'));
});

// Validation endpoint
app.post('/validate', (req, res) => {
  console.log('Validation request received');
  validateHandler(req, res);
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK',
    timestamp: new Date().toISOString(),
    config: {
      jiraHostname: config.jira.hostname,
      serverPort: config.server.port
    }
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// 404 handler
app.use((req, res) => {
  console.log('404 - Not found:', req.path);
  res.status(404).json({ error: 'Not found' });
});

app.listen(config.server.port, config.server.host, () => {
  console.log(`Server running on ${config.server.host}:${config.server.port}`);
  console.log('Available endpoints:');
  console.log('  GET  /create.html - Configuration page');
  console.log('  GET  /view.html - View configuration page');
  console.log('  POST /validate - Validation endpoint');
  console.log('  GET  /health - Health check');
}); 