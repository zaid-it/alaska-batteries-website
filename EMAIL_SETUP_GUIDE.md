# Email Form Setup Guide for Alaska Batteries Website

## Overview

The contact form uses your **Hostinger SMTP server** to send emails directly through your own email account.

## Setup Steps

### Step 1: Upload PHP Script to Hostinger

1. Log in to your **Hostinger control panel** (hPanel)
2. Go to **File Manager**
3. Navigate to your `public_html` directory (or your domain's root folder)
4. Upload the `send-email.php` file from your project
5. Note the URL where it's accessible (e.g., `https://yourdomain.com/send-email.php`)

### Step 2: Configure SMTP Settings in send-email.php

Open `send-email.php` and update these lines (around line 52-58):

```php
$smtp_host = 'smtp.hostinger.com';        // Usually smtp.hostinger.com
$smtp_port = 587;                          // 587 for TLS or 465 for SSL
$smtp_username = 'info@alaskabatteries.com';  // Your Hostinger email
$smtp_password = 'YOUR_ACTUAL_PASSWORD';       // Your email password
$smtp_from = 'info@alaskabatteries.com';       // From email address
$smtp_to = 'info@alaskabatteries.com';         // Where to receive submissions
```

**To find your SMTP settings:**

1. In hPanel, go to **Emails** → **Email Accounts**
2. Click on your email account
3. Look for **Mail Configuration** or **SMTP Settings**
4. Use the provided SMTP server and port

### Step 3: Update support.html

Open `support.html` and update line ~169:

```javascript
const EMAIL_API_URL = "https://yourdomain.com/send-email.php";
```

Replace `yourdomain.com` with your actual Hostinger domain.

### Step 4: Set File Permissions

1. In File Manager, right-click on `send-email.php`
2. Change permissions to **644** (or **755** if needed)
3. This ensures the script can be executed

### Step 5: Test the Form

1. Open your website
2. Go to the Support page
3. Fill out and submit the contact form
4. You should receive:
   - An email with the form submission
   - The user gets an auto-reply

## Security Notes

⚠️ **IMPORTANT**: Never commit `send-email.php` with your actual password to GitHub!

**To keep your password secure:**

1. Create a `.gitignore` file in your project root:

```
send-email.php
*.log
contact-log.txt
```

2. Or create a separate config file:

**config.php:**

```php
<?php
return [
    'smtp_host' => 'smtp.hostinger.com',
    'smtp_port' => 587,
    'smtp_username' => 'info@alaskabatteries.com',
    'smtp_password' => 'your_password_here',
    'smtp_from' => 'info@alaskabatteries.com',
    'smtp_to' => 'info@alaskabatteries.com'
];
```

Then in `send-email.php`:

```php
$config = require 'config.php';
$smtp_host = $config['smtp_host'];
// etc...
```

Add `config.php` to `.gitignore`.

## Features Included

✅ HTML formatted emails with Alaska Batteries branding
✅ Auto-reply to users with thank you message
✅ Form validation (name, email, phone required)
✅ Email format validation
✅ Phone number validation
✅ Success modal popup
✅ Contact submission logging
✅ Error handling
✅ CORS headers for GitHub Pages

## Troubleshooting

**"CORS policy" error:**

- Make sure line 11 in `send-email.php` has your correct GitHub Pages URL:

```php
header('Access-Control-Allow-Origin: https://zaid-it.github.io');
```

**Emails not sending:**

- Check your Hostinger email password is correct
- Verify SMTP host and port settings
- Check Hostinger email account is active
- Look for error logs in `contact-log.txt`

**500 Internal Server Error:**

- Check file permissions (should be 644 or 755)
- Enable error reporting in PHP (see line 7-9 in send-email.php)
- Check PHP error logs in hPanel

**Form submits but no email:**

- Verify your email account has SMTP enabled in Hostinger
- Check spam/junk folder
- Review the `contact-log.txt` file on your server

## Alternative: Using PHPMailer (Recommended for Better Compatibility)

If the basic `mail()` function doesn't work, you can use PHPMailer:

1. Download PHPMailer from https://github.com/PHPMailer/PHPMailer
2. Upload to your Hostinger (in a `vendor` folder)
3. I can provide an updated script using PHPMailer if needed

## Support

- Hostinger Support: https://www.hostinger.com/tutorials/
- PHPMailer Documentation: https://github.com/PHPMailer/PHPMailer

## Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com](https://www.emailjs.com)
2. Sign up for a free account (allows 200 emails/month)
3. Verify your email address

## Step 2: Add Email Service

1. After logging in, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail recommended):
   - Select **Gmail**
   - Click **Connect Account**
   - Authorize EmailJS to send emails from your Gmail account
4. Note the **Service ID** (e.g., `service_abc1234`)

## Step 3: Create Email Template

### Template for receiving contact form submissions:

1. Go to **Email Templates**
2. Click **Create New Template**
3. Template Name: `Contact Form Submission`
4. Use this template:

```
Subject: New Contact Form Submission from {{from_name}}

Hello Alaska Batteries Team,

You have received a new message from your website contact form:

Name: {{from_name}}
Email: {{user_email}}
Phone: {{user_phone}}
Subject: {{subject}}

Message:
{{message}}

---
This email was sent automatically from your website contact form.
```

5. Save and note the **Template ID** (e.g., `template_xyz5678`)

### Template for auto-reply to user:

1. Create another template: `Contact Form Auto-Reply`
2. Use this template:

```
Subject: Thank you for contacting Alaska Batteries

Dear {{from_name}},

Thank you for reaching out to Alaska Batteries. We have received your message and our team will review it carefully.

We aim to respond to all inquiries within 48 business hours. If your matter is urgent, please call us at +92 51 874 0280.

Your Message:
{{message}}

Best regards,
Alaska Batteries Team

---
7th Floor, B-3 Tower, Opp. F-9 Park
Sector F-9/G-9, Jinnah Avenue, New Blue Area
Islamabad, Pakistan, 44010
Phone: +92 51 874 0280
Email: info@alaskabatteries.com
Website: https://zaid-it.github.io/alaska-batteries-website/
```

3. Save and note this **Template ID** (e.g., `template_reply789`)

## Step 4: Get Your Public Key

1. Go to **Account** → **General**
2. Find your **Public Key** (e.g., `abcd1234efgh5678`)

## Step 5: Update support.html

Open `support.html` and replace the placeholders:

1. Line ~174: Replace `YOUR_PUBLIC_KEY` with your actual public key
2. Line ~193: Replace `YOUR_SERVICE_ID` with your service ID
3. Line ~193: Replace `YOUR_TEMPLATE_ID` with your template ID

Example:

```javascript
emailjs.init("abcd1234efgh5678"); // Your public key

emailjs.sendForm("service_abc1234", "template_xyz5678", this);
```

## Step 6: (Optional) Add Auto-Reply

To send an automatic thank-you email to users, modify the form submission handler:

```javascript
emailjs.sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", this).then(
  function (response) {
    console.log("SUCCESS!", response.status, response.text);

    // Send auto-reply to user
    emailjs.sendForm("YOUR_SERVICE_ID", "template_reply789", this);

    // Show success modal
    document.getElementById("successModal").classList.remove("hidden");
    document.getElementById("successModal").classList.add("flex");

    // Reset form
    document.getElementById("contactForm").reset();

    // Re-enable button
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
    submitBtn.classList.remove("opacity-50", "cursor-not-allowed");
  },
  ...
);
```

## Step 7: Test the Form

1. Open your website
2. Navigate to the Support page
3. Fill out the contact form
4. Click "Send Message"
5. Check if:
   - Success modal appears
   - You receive an email with the form data
   - User receives a thank-you email (if auto-reply is set up)

## Alternative: Using Formspree (Simpler Option)

If you prefer a simpler setup without EmailJS:

1. Go to [https://formspree.io](https://formspree.io)
2. Sign up for free account
3. Create a new form
4. Get your form endpoint (e.g., `https://formspree.io/f/abc123xyz`)
5. In `support.html`, replace the EmailJS script with:

```html
<script>
  document.getElementById("contactForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const submitBtn = document.getElementById("submitBtn");
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    const formData = new FormData(this);

    try {
      const response = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        document.getElementById("successModal").classList.remove("hidden");
        document.getElementById("successModal").classList.add("flex");
        this.reset();
      } else {
        alert("Failed to send message. Please try again.");
      }
    } catch (error) {
      alert("Failed to send message. Please try again.");
    }

    submitBtn.disabled = false;
    submitBtn.textContent = "Send Message";
  });
</script>
```

## Current Form Features

✅ Required fields: Name, Email, Phone Number
✅ Email validation
✅ Phone number format validation
✅ Success modal with close button (top-right X)
✅ Form reset after successful submission
✅ Loading state while sending
✅ Error handling

## Troubleshooting

**Form doesn't submit:**

- Check browser console for errors
- Verify all IDs match in the code
- Ensure EmailJS SDK is loaded

**Emails not arriving:**

- Check EmailJS dashboard for quota
- Verify service and template IDs are correct
- Check spam folder
- Ensure email service is connected

**Success modal doesn't appear:**

- Check modal ID is `successModal`
- Verify classes are being toggled correctly

## Support

For EmailJS support: https://www.emailjs.com/docs/
For Formspree support: https://help.formspree.io/
