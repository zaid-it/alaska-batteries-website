<?php
/**
 * SMTP config for send-email.php
 * IMPORTANT:
 * - Place this file outside your webroot (one level above `public_html`) on Hostinger.
 * - Do NOT commit real credentials to version control.
 * - Set file permissions so only the web user can read it.
 */

return [
    // Hostinger SMTP settings (example)
    'smtp_host' => 'smtp.hostinger.com',
    'smtp_port' => 587,
    'smtp_user' => 'info@alaskabatteries.com',
    'smtp_pass' => 'YOUR_REAL_SMTP_PASSWORD',
    'smtp_from' => 'info@alaskabatteries.com',
    'smtp_from_name' => 'Alaska Batteries',
    // Optional: override recipients if you want different addresses for testing
    // 'smtp_to_admin' => 'info@alaskabatteries.com',
    // 'smtp_to_careers' => 'careers@alaskabatteries.com',
];
