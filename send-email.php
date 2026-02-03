<?php
/**
 * Alaska Batteries Contact Form Email Handler
 * This file should be uploaded to your Hostinger server
 */

// Enable error reporting for debugging (remove in production)
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);

// CORS headers to allow requests from your GitHub Pages site
header('Access-Control-Allow-Origin: https://zaid-it.github.io');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit();
}

// Get POST data
$data = json_decode(file_get_contents('php://input'), true);

// Validate required fields
$required_fields = ['name', 'email', 'phone'];
foreach ($required_fields as $field) {
    if (empty($data[$field])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => ucfirst($field) . ' is required']);
        exit();
    }
}

// Sanitize inputs
$name = htmlspecialchars(strip_tags(trim($data['name'])));
$email = filter_var(trim($data['email']), FILTER_SANITIZE_EMAIL);
$phone = htmlspecialchars(strip_tags(trim($data['phone'])));
$subject = htmlspecialchars(strip_tags(trim($data['subject'] ?? 'No Subject')));
$message = htmlspecialchars(strip_tags(trim($data['message'] ?? '')));

// Validate email format
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid email format']);
    exit();
}

// ============================
// SMTP CONFIGURATION
// Replace these with your actual Hostinger SMTP settings
// ============================
$smtp_host = 'smtp.hostinger.com';  // Your Hostinger SMTP host
$smtp_port = 587;                    // Usually 587 for TLS or 465 for SSL
$smtp_username = 'info@alaskabatteries.com';  // Your Hostinger email
$smtp_password = 'YOUR_EMAIL_PASSWORD';        // Your email password
$smtp_from = 'info@alaskabatteries.com';       // From email address
$smtp_from_name = 'Alaska Batteries Website';
$smtp_to = 'info@alaskabatteries.com';         // Where to receive contact form submissions

// Email content for admin
$email_subject = "New Contact Form Submission from $name";
$email_body = "
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #cc001b; color: white; padding: 20px; text-align: center; }
        .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #cc001b; }
        .value { margin-top: 5px; padding: 10px; background: white; border-left: 3px solid #cc001b; }
        .footer { text-align: center; padding: 20px; font-size: 12px; color: #777; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h2>New Contact Form Submission</h2>
        </div>
        <div class='content'>
            <div class='field'>
                <div class='label'>Name:</div>
                <div class='value'>$name</div>
            </div>
            <div class='field'>
                <div class='label'>Email:</div>
                <div class='value'>$email</div>
            </div>
            <div class='field'>
                <div class='label'>Phone:</div>
                <div class='value'>$phone</div>
            </div>
            <div class='field'>
                <div class='label'>Subject:</div>
                <div class='value'>$subject</div>
            </div>
            <div class='field'>
                <div class='label'>Message:</div>
                <div class='value'>" . nl2br($message) . "</div>
            </div>
        </div>
        <div class='footer'>
            <p>This email was sent automatically from your website contact form.</p>
            <p>Received on " . date('F j, Y \a\t g:i A') . "</p>
        </div>
    </div>
</body>
</html>
";

// Auto-reply email content for user
$reply_subject = "Thank you for contacting Alaska Batteries";
$reply_body = "
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #cc001b; color: white; padding: 20px; text-align: center; }
        .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
        .footer { background: #333; color: white; padding: 20px; }
        .footer a { color: #cc001b; text-decoration: none; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h2>Thank You for Contacting Us</h2>
        </div>
        <div class='content'>
            <p>Dear $name,</p>
            <p>Thank you for reaching out to Alaska Batteries. We have received your message and our team will review it carefully.</p>
            <p>We aim to respond to all inquiries within <strong>48 business hours</strong>. If your matter is urgent, please call us at <strong>+92 51 874 0280</strong>.</p>
            <p style='margin-top: 20px; padding: 15px; background: white; border-left: 3px solid #cc001b;'>
                <strong>Your Message:</strong><br>
                " . nl2br($message) . "
            </p>
            <p style='margin-top: 20px;'>Best regards,<br><strong>Alaska Batteries Team</strong></p>
        </div>
        <div class='footer'>
            <p><strong>Alaska Batteries</strong></p>
            <p>7th Floor, B-3 Tower, Opp. F-9 Park<br>
            Sector F-9/G-9, Jinnah Avenue, New Blue Area<br>
            Islamabad, Pakistan, 44010</p>
            <p>Phone: +92 51 874 0280<br>
            Email: info@alaskabatteries.com<br>
            Website: <a href='https://zaid-it.github.io/alaska-batteries-website/'>alaskabatteries.com</a></p>
        </div>
    </div>
</body>
</html>
";

// Try to send emails using Hostinger SMTP
try {
    // Create email headers for admin notification
    $headers_admin = [
        'MIME-Version: 1.0',
        'Content-Type: text/html; charset=UTF-8',
        'From: ' . $smtp_from_name . ' <' . $smtp_from . '>',
        'Reply-To: ' . $name . ' <' . $email . '>',
        'X-Mailer: PHP/' . phpversion()
    ];

    // Create email headers for user auto-reply
    $headers_user = [
        'MIME-Version: 1.0',
        'Content-Type: text/html; charset=UTF-8',
        'From: ' . $smtp_from_name . ' <' . $smtp_from . '>',
        'Reply-To: ' . $smtp_from,
        'X-Mailer: PHP/' . phpversion()
    ];

    // Configure SMTP settings
    ini_set('SMTP', $smtp_host);
    ini_set('smtp_port', $smtp_port);
    ini_set('sendmail_from', $smtp_from);

    // Send email to admin
    $admin_sent = mail(
        $smtp_to,
        $email_subject,
        $email_body,
        implode("\r\n", $headers_admin)
    );

    // Send auto-reply to user
    $user_sent = mail(
        $email,
        $reply_subject,
        $reply_body,
        implode("\r\n", $headers_user)
    );

    if ($admin_sent) {
        // Log successful submission
        $log_entry = date('Y-m-d H:i:s') . " - Contact form submission from $name ($email)\n";
        file_put_contents('contact-log.txt', $log_entry, FILE_APPEND);

        http_response_code(200);
        echo json_encode([
            'success' => true,
            'message' => 'Message sent successfully',
            'auto_reply_sent' => $user_sent
        ]);
    } else {
        throw new Exception('Failed to send email');
    }

} catch (Exception $e) {
    error_log('Email sending failed: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Failed to send message. Please try again or contact us directly.'
    ]);
}
?>
