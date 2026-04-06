# Deploy On Render With EmailJS

## 1) Create EmailJS assets

1. In EmailJS, create an Email Service.
2. Create an Email Template.
3. Copy these values:
   - Public Key
   - Service ID
   - Template ID

## 2) Push this repo to GitHub

Render will deploy from your GitHub repository.

## 3) Create the Render service

1. In Render, choose New + and select Blueprint.
2. Select your repository.
3. Render will detect `render.yaml` and create a static web service.

## 4) Set environment variables in Render

In the service settings, add:

- `EMAILJS_PUBLIC_KEY`
- `EMAILJS_SERVICE_ID`
- `EMAILJS_TEMPLATE_ID` (admin notification template)
- `EMAILJS_TEMPLATE_ID_CLIENT_REPLY` (client auto-reply template)

Then trigger a redeploy.

## 5) How this works

- Render runs `bash scripts/render-build.sh` during build.
- The script generates `emailjs-config.json` from your environment variables.
- `js/api.js` reads `/emailjs-config.json` at runtime and uses EmailJS for contact form submission.

## 6) Optional local test without Render

Create `emailjs-config.json` in project root:

```json
{
  "publicKey": "YOUR_EMAILJS_PUBLIC_KEY",
  "serviceId": "YOUR_EMAILJS_SERVICE_ID",
  "templateId": "YOUR_EMAILJS_TEMPLATE_ID",
  "templateIdClientReply": "YOUR_EMAILJS_TEMPLATE_ID_CLIENT_REPLY"
}
```

Then serve locally and submit the contact form.
## 7) Email templates and IDs

Your form now sends TWO emails on submission:

1. **Admin Notification** → your mailbox (social@securide24.com)
   - Template ID: `EMAILJS_TEMPLATE_ID`
   - Contains all form data
   
2. **Client Auto Reply** → sender's email ({{email}})
   - Template ID: `EMAILJS_TEMPLATE_ID_CLIENT_REPLY`
   - Acknowledgment message

Both templates use these form field names:

- `firstName`
- `lastName`
- `email`
- `phone`
- `company`
- `industry`
- `requirement`
- `message`
- `submittedAt`

## 8) Submission flow

When a user submits the contact form:

1. js/api.js sends form data to EmailJS
2. EmailJS sends Admin Notification to your mailbox
3. EmailJS sends Client Auto Reply to client's email
4. Both happen in parallel for fast response
Map these fields inside your EmailJS template.
