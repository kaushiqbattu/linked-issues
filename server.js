const express = require('express');
const { validateHandler } = require('./validate.js');
const config = require('./config');

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Serve static HTML files
app.get('/create.html', (req, res) => {
  res.sendFile(__dirname + '/create.html');
});

app.get('/view.html', (req, res) => {
  res.sendFile(__dirname + '/view.html');
});

// Validation endpoint
app.post('/validate', validateHandler);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

app.listen(config.server.port, config.server.host, () => {
  console.log(`Server running on ${config.server.host}:${config.server.port}`);
}); 