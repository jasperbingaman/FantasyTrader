# Fantasy Trader - Google Sheets Setup Instructions

This guide will help you set up email capture that sends signups and waitlist entries directly to a Google Sheet.

---

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "Fantasy Trader Signups"
4. In Row 1, add these column headers:
   - A1: `Timestamp`
   - B1: `Type`
   - C1: `Email`
   - D1: `First Name`
   - E1: `Last Name`

Your sheet should look like this:

| Timestamp | Type | Email | First Name | Last Name |
|-----------|------|-------|------------|-----------|
| | | | | |

---

## Step 2: Create a Google Apps Script

1. In your Google Sheet, go to **Extensions** → **Apps Script**
2. Delete any existing code in the editor
3. Paste the following code:

```javascript
// Fantasy Trader Email Capture Script
// This receives form submissions and adds them to the spreadsheet

function doPost(e) {
  try {
    // Parse the incoming data - handles both form data and raw JSON
    let data;
    if (e.postData && e.postData.contents) {
      // Raw JSON string in body
      data = JSON.parse(e.postData.contents);
    } else if (e.parameter && e.parameter.data) {
      // Form-encoded data
      data = JSON.parse(e.parameter.data);
    } else {
      throw new Error('No data received');
    }
    
    // Get the active spreadsheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Prepare the row data
    const row = [
      data.timestamp || new Date().toISOString(),
      data.type || 'unknown',
      data.email || '',
      data.firstName || '',
      data.lastName || ''
    ];
    
    // Append the row
    sheet.appendRow(row);
    
    // Return success
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function - run this to verify the script works
function testDoPost() {
  const testData = {
    postData: {
      contents: JSON.stringify({
        type: 'test',
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
        timestamp: new Date().toISOString()
      })
    }
  };
  
  const result = doPost(testData);
  Logger.log(result.getContent());
}
```

4. Click the **Save** icon (or Ctrl+S)
5. Name the project "Fantasy Trader Webhook"

---

## Step 3: Deploy as Web App

1. Click **Deploy** → **New deployment**
2. Click the gear icon next to "Select type" and choose **Web app**
3. Fill in the settings:
   - **Description**: "Fantasy Trader Email Capture"
   - **Execute as**: "Me"
   - **Who has access**: "Anyone"
4. Click **Deploy**
5. Click **Authorize access** and follow the prompts to grant permissions
6. **Copy the Web app URL** - it will look like:
   ```
   https://script.google.com/macros/s/AKfycbx.../exec
   ```

---

## Step 4: Add the URL to Your Website

1. Open `index.html` in your Fantasy Trader website folder
2. Find this line near the top of the `<script>` section:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_SCRIPT_URL_HERE';
   ```
3. Replace `YOUR_GOOGLE_SCRIPT_URL_HERE` with your actual Web App URL:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx.../exec';
   ```
4. Save the file

---

## Step 5: Test It!

1. Open your website in a browser
2. Try the waitlist form or signup form
3. Check your Google Sheet - you should see new rows appear!

---

## Troubleshooting

### "Script not working"
- Make sure you deployed as a **Web App** (not just saved)
- Make sure "Who has access" is set to "Anyone"
- Try redeploying with a new version

### "No data appearing in sheet"
- Check the browser console (F12) for errors
- Verify the URL is correct (no extra spaces)
- Make sure you're on the correct sheet/tab

### "CORS errors"
- The code uses `mode: 'no-cors'` which should work
- Google Apps Script handles CORS automatically for web apps

---

## What Data Gets Captured

### Waitlist Form
```json
{
  "type": "waitlist",
  "email": "user@example.com",
  "timestamp": "2025-01-01T12:00:00.000Z"
}
```

### Signup Form
```json
{
  "type": "signup",
  "email": "user@example.com",
  "firstName": "Wyatt",
  "lastName": "Erdmann",
  "timestamp": "2025-01-01T12:00:00.000Z"
}
```

---

## Sending Updates to Your List

Once you have emails in your Google Sheet, you can:

1. **Export to CSV** and import into email services like:
   - Mailchimp
   - ConvertKit
   - Buttondown
   - SendGrid

2. **Use Google Sheets add-ons** like:
   - "Yet Another Mail Merge" (YAMM)
   - "Mail Merge with Attachments"

3. **Connect to Zapier/Make** to automatically:
   - Add new signups to Mailchimp
   - Send welcome emails
   - Notify you on Slack

---

## Need Help?

If you run into issues:
1. Double-check all the steps above
2. Test the Google Apps Script using the `testDoPost()` function
3. Check browser console for JavaScript errors

Good luck with Fantasy Trader! 🚀
