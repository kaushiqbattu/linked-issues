# Linked Issues Validator

A Jira workflow validator that checks if any linked issue matches a provided JQL query.

## Overview

This Atlassian Connect app adds a workflow validator to Jira that:
- Blocks workflow transitions unless at least one linked issue matches the configured JQL
- Allows you to configure custom JQL queries during workflow setup
- Provides clear feedback about why transitions are blocked or allowed

## Features

- **Flexible JQL Configuration**: Set any JQL query during workflow configuration
- **Any Match Logic**: Transition is allowed if ANY linked issue matches the JQL (not all)
- **Clear Feedback**: Provides detailed messages about validation results
- **Easy Setup**: Simple configuration interface in Jira workflow editor
- **GitHub Pages Hosting**: Static hosting for easy deployment

## Installation

### GitHub Pages Hosting (Current Setup)

1. **Repository Setup**:
   - This repository is configured for GitHub Pages hosting
   - The `baseUrl` in `atlassian-connect.json` points to GitHub Pages
   - All files are static HTML/JavaScript

2. **Install in Jira**:
   - Go to Jira Administration → Manage apps
   - Upload the `atlassian-connect.json` file
   - The app will be available for workflow configuration

### Alternative: Server Hosting

For full server-side validation functionality:

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Configure Jira Instance**:
   - Update the `hostname` in `config.js` to point to your Jira instance
   - Set up proper authentication (API token or OAuth)

3. **Deploy the App**:
   - Deploy to a hosting service (Heroku, AWS, etc.)
   - Update the `baseUrl` in `atlassian-connect.json` to point to your deployed app

## Usage

1. **Add to Workflow**:
   - Go to Jira Administration → Issues → Workflows
   - Edit your workflow
   - Add the "Any linked issue matches JQL" validator to a transition

2. **Configure JQL**:
   - Enter your JQL query (e.g., `project = SUP and statusCategory = Done`)
   - The transition will be allowed if any linked issue matches this JQL

3. **Test the Validator**:
   - Try transitioning an issue with linked issues
   - The validator will show appropriate success/error messages

## Configuration Examples

- **Status-based**: `status = "Done"`
- **Project-based**: `project = "SUP"`
- **Complex queries**: `project = "SUP" AND statusCategory = "Done" AND assignee is not EMPTY`

## File Structure

```
├── atlassian-connect.json  # App descriptor
├── create.html             # Configuration page
├── view.html              # View configuration page
├── validate.html          # Validation handler (static)
├── index.html             # Main page for GitHub Pages
├── README.md              # This file
└── TROUBLESHOOTING.md     # Troubleshooting guide
```

## GitHub Pages vs Server Hosting

### GitHub Pages (Current)
- ✅ Easy deployment
- ✅ No server costs
- ✅ Static file hosting
- ❌ Limited validation logic
- ❌ No server-side processing

### Server Hosting (Recommended for Production)
- ✅ Full validation functionality
- ✅ Real-time Jira API calls
- ✅ Complete error handling
- ❌ Requires hosting service
- ❌ More complex deployment

## Development

### For GitHub Pages:
```bash
# No build process needed - just commit and push
git add .
git commit -m "Update validator"
git push origin main
```

### For Server Hosting:
```bash
# Install dependencies
npm install

# Start development server
npm start

# Test endpoints
node test-server.js
```

## Troubleshooting

### Common Issues

1. **"Configuration page not found"**
   - Ensure GitHub Pages is enabled for your repository
   - Check that the `baseUrl` in `atlassian-connect.json` is correct

2. **"Cannot save configuration"**
   - Check browser console for JavaScript errors
   - Verify the create.html page loads correctly

3. **"Validator not working"**
   - This is expected with GitHub Pages hosting
   - For full validation, deploy to a server hosting service

### Getting Help

1. Check the browser console for errors
2. Verify all HTML files are accessible via GitHub Pages
3. Test the configuration interface manually
4. Consider upgrading to server hosting for full functionality

## License

MIT License 