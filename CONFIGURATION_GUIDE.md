# JQL Configuration Troubleshooting Guide

## Issue: Cannot Enter JQL in Validator Configuration

If you're unable to enter JQL in the validator configuration, follow these steps:

### Step 1: Test the Configuration Page

1. **Open the test page** to verify the Jira Connect API is working:
   ```
   https://kaushiqbattu.github.io/linked-issues/test.html
   ```

2. **Check browser console** for any JavaScript errors:
   - Press F12 to open developer tools
   - Go to the Console tab
   - Look for any red error messages

### Step 2: Verify App Installation

1. **Check if the app is properly installed**:
   - Go to Jira Administration → Manage apps
   - Look for "Linked Issues Validator"
   - Ensure it's enabled and not showing any errors

2. **Reinstall the app if needed**:
   - Remove the existing app
   - Upload the `atlassian-connect.json` file again
   - Check for any installation errors

### Step 3: Access the Configuration Page

1. **Direct access test**:
   ```
   https://kaushiqbattu.github.io/linked-issues/create.html
   ```
   - This should show a form with a JQL input field
   - If it doesn't load, there's a network/hosting issue

2. **From Jira workflow editor**:
   - Go to Jira Administration → Issues → Workflows
   - Edit a workflow
   - Add the "Any linked issue matches JQL" validator
   - Click the edit (pencil) icon next to the validator
   - This should open the configuration page

### Step 4: Common Issues and Solutions

#### Issue: "Configuration page not found"
**Solution**:
- Ensure GitHub Pages is enabled for your repository
- Check that the `baseUrl` in `atlassian-connect.json` is correct
- Verify the file is accessible at the GitHub Pages URL

#### Issue: "Cannot save configuration"
**Solution**:
- Check browser console for JavaScript errors
- Ensure you're entering a valid JQL query
- Try refreshing the page and entering the JQL again

#### Issue: "Jira Connect API not available"
**Solution**:
- This usually means you're accessing the page outside of Jira
- The configuration page must be opened from within Jira
- Try accessing it through the workflow editor

#### Issue: "No JQL configured" persists
**Solution**:
- Clear browser cache and cookies
- Try a different browser
- Check if there are any browser extensions blocking JavaScript

### Step 5: Manual Configuration Test

1. **Test with a simple JQL**:
   ```
   project = "SUP"
   ```

2. **Test with a more complex JQL**:
   ```
   project = "SUP" AND statusCategory = "Done"
   ```

3. **Check for validation errors**:
   - The page should show real-time feedback
   - Green checkmarks indicate valid input
   - Red X marks indicate errors

### Step 6: Alternative Configuration Methods

If the web interface still doesn't work:

1. **Use the test page** to verify API connectivity:
   ```
   https://kaushiqbattu.github.io/linked-issues/test.html
   ```

2. **Check the view page** to see current configuration:
   ```
   https://kaushiqbattu.github.io/linked-issues/view.html
   ```

3. **Manual configuration** (if needed):
   - You can manually edit the workflow configuration
   - Add the JQL directly in the workflow XML if necessary

### Step 7: Debug Information

When reporting issues, include:

1. **Browser information**:
   - Browser name and version
   - Any error messages from console

2. **Jira information**:
   - Jira version
   - Whether you're using Cloud or Server
   - Any error messages from Jira logs

3. **Network information**:
   - Can you access the GitHub Pages URL directly?
   - Are there any network errors in browser dev tools?

### Step 8: Getting Help

If you're still having issues:

1. **Check the test page** first to verify API connectivity
2. **Try a different browser** to rule out browser-specific issues
3. **Check Jira logs** for any app-related errors
4. **Verify the app is properly installed** in Jira

### Expected Behavior

When working correctly, you should see:

1. **Configuration page loads** with a clean interface
2. **JQL input field** is visible and editable
3. **Real-time feedback** as you type
4. **Save button** works and saves the configuration
5. **View page** shows the configured JQL

If any of these steps fail, the issue is likely with:
- App installation in Jira
- Network connectivity to GitHub Pages
- Browser JavaScript settings
- Jira Connect API availability 