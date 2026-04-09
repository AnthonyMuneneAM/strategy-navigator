# WF-4: Daily Story Pipeline Manager - Setup Guide

## Overview
This workflow automates the daily distribution of stories to contacts, managing both initial Week 1 sends and progression to subsequent weeks.

## Prerequisites

### Required n8n Integrations
1. **Airtable** - For contact and campaign management
2. **Google Drive** - For downloading story attachments
3. **Gmail** - For sending emails

### Required Airtable Tables

#### 1. Verified Contact
Fields needed:
- `id` (Record ID)
- `Email` (Email field)
- `Publication` (Single line text)

#### 2. Campaign Tracking
Fields needed:
- `id` (Record ID)
- `Story` (Link to Publication Story)
- `Contact` (Link to Verified Contact)
- `Story Week Number` (Number)
- `Is Latest Story` (Checkbox)
- `Pipeline Status` (Single select: Queued, Active, Complete)
- `Send Status` (Single select: Pending, Sent)
- `Sent Date` (Date)
- `Next Action Type` (Single select: Initial_Send, Publication_Check_1, etc.)
- `Next Action Date` (Date)
- `Next Story Send Date` (Formula or Date)

#### 3. Publication Story
Fields needed:
- `id` (Record ID)
- `Week` (Single line text, e.g., "Week 1", "Week 2")
- `Status` (Single select: Done, Draft, etc.)
- `Story Content` (Long text)
- `Image` (Attachment - Google Drive URL)
- `Attachment` (Attachment - Google Drive URL)
- `Pitch` (Attachment - Google Drive URL)

## Installation Steps

### 1. Import Workflow
1. Open your n8n instance at https://standout4growth.app.n8n.cloud
2. Click "Add workflow" → "Import from File"
3. Select `WF-4_Daily_Story_Pipeline_Manager.json`

### 2. Configure Credentials

#### Airtable
1. Click on any Airtable node
2. Add credential → "Airtable Token API"
3. Get your API token from https://airtable.com/create/tokens
4. Replace `appXXXXXXXXXXXXXX` in ALL Airtable nodes with your actual Base ID

#### Google Drive
1. Click on any Google Drive node
2. Add credential → "Google Drive OAuth2 API"
3. Follow OAuth flow to connect your Google account

#### Gmail
1. Click on any Gmail node
2. Add credential → "Gmail OAuth2"
3. Follow OAuth flow to connect your Gmail account

### 3. Update Configuration

#### Schedule Trigger
- Currently set to daily at 00:00
- Adjust timing in "Schedule Trigger" node if needed

#### Summary Email
- Update recipient in "Send Summary Email" node
- Replace `your-email@domain.com` with your actual email

### 4. Test the Workflow

#### Test with Sample Data
1. Disable the Schedule Trigger
2. Add a "Manual Trigger" node temporarily
3. Run workflow manually to test
4. Check:
   - New contacts are identified correctly
   - Week 1 story is retrieved
   - Emails are sent with attachments
   - Campaign tracking records are created

#### Verify Airtable Formulas
Ensure `Next Story Send Date` formula in Campaign Tracking calculates correctly based on your business logic.

## Workflow Logic

### Part 1: New Contacts (Week 1)
1. Get all verified contacts
2. Get all campaign tracking records
3. Find contacts without any campaigns
4. If new contacts exist:
   - Get Week 1 story
   - Download story files (image, attachment, pitch)
   - For each new contact:
     - Create campaign tracking record
     - Send Week 1 email with attachments
     - Mark as sent

### Part 2: Existing Contacts (Next Week)
1. Find contacts ready for next story (completed current story)
2. For each ready contact:
   - Calculate next week number
   - Get next week story
   - Mark previous story as not latest
   - Download next story files
   - Create new campaign tracking record
   - Get contact details
   - Send next week email
   - Mark as sent

### Part 3: Reporting
- Send summary email with counts of:
  - New contacts who received Week 1
  - Contacts who received next story

## Troubleshooting

### Common Issues

#### 1. "Contact field not found"
- Verify Airtable field names match exactly (case-sensitive)
- Check that linked record fields use array format: `[recordId]`

#### 2. "File download failed"
- Ensure Google Drive URLs in Airtable are accessible
- Verify Google Drive credentials have proper permissions

#### 3. "Email not sent"
- Check Gmail daily sending limits (500/day for free accounts)
- Verify email addresses are valid
- Check spam folder for test emails

#### 4. "No new contacts found"
- Verify Campaign Tracking table has correct Contact field links
- Check that Contact IDs match between tables

### Debug Mode
1. Enable "Execute Once" on nodes to test individually
2. Check node output by clicking on node after execution
3. Use "Execute Node" to test specific nodes

## Maintenance

### Weekly Tasks
- Monitor summary emails for delivery issues
- Check Campaign Tracking for stuck records

### Monthly Tasks
- Review story progression rates
- Audit contacts who haven't progressed
- Clean up old campaign records if needed

## Optimization Tips

1. **Batch Processing**: Currently set to 10 contacts per batch. Adjust in "Split New Contacts Into Batches" node based on your volume.

2. **Error Handling**: Add error workflows to handle:
   - Missing stories
   - Failed email sends
   - Invalid contact data

3. **Logging**: Consider adding a logging table in Airtable to track:
   - Workflow execution times
   - Error counts
   - Success rates

## Support

For issues with:
- **n8n**: https://community.n8n.io/
- **Airtable**: https://support.airtable.com/
- **This workflow**: Check the workflow specification document

## Version History
- v1.0 (2024-03-26): Initial release
