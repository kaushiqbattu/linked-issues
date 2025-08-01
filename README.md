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

## Installation

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Configure Jira Instance**:
   - Update the `hostname` in `validate.js` to point to your Jira instance
   - Set up proper authentication (API token or OAuth)

3. **Deploy the App**:
   - Deploy to a hosting service (Heroku, AWS, etc.)
   - Update the `baseUrl` in `atlassian-connect.json` to point to your deployed app

4. **Install in Jira**:
   - Upload the `atlassian-connect.json` file to your Jira instance
   - Or install via the Atlassian Marketplace

## Usage

1. **Add to Workflow**:
   - Go to Jira Administration → Issues → Workflows
   - Edit your workflow
   - Add the "All linked issues match JQL" validator to a transition

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

## API Endpoints

- `POST /validate` - Main validation endpoint
- `GET /create.html` - Configuration page
- `GET /view.html` - View configuration page
- `GET /health` - Health check endpoint

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start production server
npm start
```

## Configuration

The validator requires:
- Jira REST API access
- Proper authentication (API token or OAuth)
- Network access to your Jira instance

## Troubleshooting

1. **Authentication Issues**: Ensure your API token is correct and has proper permissions
2. **Network Issues**: Verify the Jira instance hostname is correct
3. **JQL Errors**: Test your JQL query in Jira's issue search first

## License

MIT License 