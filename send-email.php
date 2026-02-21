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
// Accept JSON payload or regular form-data/post
$raw = file_get_contents('php://input');
$json = json_decode($raw, true);
// Prefer JSON when provided, fall back to $_POST
$data = is_array($json) ? $json : $_POST;

// Validate required fields
// Determine form type: support, careers, become-dealer (dealer)
$form_type = strtolower(trim($data['form'] ?? $data['form_type'] ?? 'support'));

// Map incoming keys to normalized names for consistency
function get_value($data, $keys, $default = '') {
    foreach ((array)$keys as $k) {
        if (isset($data[$k]) && $data[$k] !== '') return $data[$k];
    }
    return $default;
}

// Normalize fields
$name = get_value($data, ['name', 'from_name', 'fullName', 'from_name', 'careers-fullName']);
$email = get_value($data, ['email', 'user_email', 'userEmail']);
$phone = get_value($data, ['phone', 'user_phone', 'userPhone']);
$company = get_value($data, ['company', 'from_company', 'companyName']);
$subject = get_value($data, ['subject'], 'No Subject');
$message = get_value($data, ['message', 'careers-message'], '');

// Check required fields according to form type
$missing = [];
if ($form_type === 'careers') {
    if (!$name) $missing[] = 'Name';
    if (!$email) $missing[] = 'Email';
    if (!$phone) $missing[] = 'Phone';
    $has_resume = !empty($_FILES['resume']['name']) || !empty($_FILES['careers-resume']['name']);
    if (!$has_resume) $missing[] = 'Resume (file)';
} elseif ($form_type === 'dealer') {
    if (!$name) $missing[] = 'Name';
    if (!$company) $missing[] = 'Company';
    if (!$email) $missing[] = 'Email';
    if (!$phone) $missing[] = 'Phone';
} else {
    if (!$name) $missing[] = 'Name';
    if (!$email) $missing[] = 'Email';
    if (!$phone) $missing[] = 'Phone';
}

if (!empty($missing)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Required fields missing: ' . implode(', ', $missing)]);
    exit();
}

// Sanitize inputs
$name = htmlspecialchars(strip_tags(trim($data['name'])));
$email = filter_var(trim($data['email']), FILTER_SANITIZE_EMAIL);
$phone = htmlspecialchars(strip_tags(trim($data['phone'])));
$subject = htmlspecialchars(strip_tags(trim($data['subject'] ?? 'No Subject')));
$message = htmlspecialchars(strip_tags(trim($data['message'] ?? '')));

// Collect interests (may come as array from JSON or as checkbox POST 'interests[]')
$interests = [];
if (isset($data['interests'])) {
    if (is_array($data['interests'])) {
        $interests = $data['interests'];
    } elseif (is_string($data['interests'])) {
        $decoded = json_decode($data['interests'], true);
        if (is_array($decoded)) $interests = $decoded;
        else $interests = array_map('trim', explode(',', $data['interests']));
    }
} elseif (!empty($_POST['interests'])) {
    if (is_array($_POST['interests'])) $interests = $_POST['interests'];
    else $interests = array_map('trim', explode(',', $_POST['interests']));
}
// Normalize and sanitize interest values
$interests = array_values(array_filter(array_map(function($i){ return htmlspecialchars(strip_tags(trim((string)$i))); }, (array)$interests)));

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
// ============================
// SMTP CONFIGURATION / RECIPIENTS
// Update SMTP credentials if you plan to send via authenticated SMTP (PHPMailer recommended).
// The script below will fall back to PHP mail() if no SMTP library is present. Hostinger typically
// requires authenticated SMTP — for production use install PHPMailer and configure SMTP auth.
// ============================
$smtp_host = 'smtp.hostinger.com';
$smtp_port = 587;
$smtp_username = 'info@alaskabatteries.com';
$smtp_password = 'YOUR_EMAIL_PASSWORD';
$smtp_from = 'info@alaskabatteries.com';
$smtp_from_name = 'Alaska Batteries Website';

// Choose recipient based on form type
switch ($form_type) {
    case 'careers':
        $smtp_to = 'careers@alaskabatteries.com';
        $email_subject = "New Careers Application from $name";
        break;
    case 'dealer':
        $smtp_to = 'info@alaskabatteries.com';
        $email_subject = "New Dealer Enquiry from $name";
        break;
    default:
        $smtp_to = 'info@alaskabatteries.com';
        $email_subject = "New Contact Form Submission from $name";
}

// Email content for admin
$email_subject = "New Contact Form Submission from $name";
// Build email body depending on form type
$email_body = "<!DOCTYPE html><html><head><meta charset=\"utf-8\"><style>body{font-family:Arial,Helvetica,sans-serif;color:#333} .container{max-width:700px;margin:0 auto;padding:20px} .header{background:#c00d1e;color:#fff;padding:16px;text-align:center} .content{background:#f9f9f9;padding:16px;border:1px solid #ddd} .field{margin-bottom:12px}.label{font-weight:700;color:#c00d1e}.value{margin-top:6px;padding:10px;background:#fff;border-left:3px solid #c00d1e}</style></head><body><div class=\"container\"><div class=\"header\"><h2>Website Submission</h2></div><div class=\"content\">";

$email_body .= "<div class='field'><div class='label'>Name:</div><div class='value'>".htmlspecialchars($name)."</div></div>";
$email_body .= "<div class='field'><div class='label'>Email:</div><div class='value'>".htmlspecialchars($email)."</div></div>";
$email_body .= "<div class='field'><div class='label'>Phone:</div><div class='value'>".htmlspecialchars($phone)."</div></div>";
if ($company) $email_body .= "<div class='field'><div class='label'>Company:</div><div class='value'>".htmlspecialchars($company)."</div></div>";
$email_body .= "<div class='field'><div class='label'>Subject:</div><div class='value'>".htmlspecialchars($subject)."</div></div>";
$email_body .= "<div class='field'><div class='label'>Message:</div><div class='value'>".nl2br(htmlspecialchars($message))."</div></div>";

// Include primary interests for dealer form if provided
if ($form_type === 'dealer' && !empty($interests)) {
    $email_body .= "<div class='field'><div class='label'>Primary Interest(s):</div><div class='value'>".htmlspecialchars(implode(', ', $interests))."</div></div>";
}

// Handle resume upload if present (careers)
$upload_link = '';
if ($form_type === 'careers') {
    $file_key = !empty($_FILES['resume']['name']) ? 'resume' : ( !empty($_FILES['careers-resume']['name']) ? 'careers-resume' : null );
    if ($file_key && isset($_FILES[$file_key]) && $_FILES[$file_key]['error'] === UPLOAD_ERR_OK) {
        $uploads_dir = __DIR__ . DIRECTORY_SEPARATOR . 'uploads';
        if (!is_dir($uploads_dir)) mkdir($uploads_dir, 0755, true);
        $tmp_name = $_FILES[$file_key]['tmp_name'];
        $original_name = basename($_FILES[$file_key]['name']);
        $safe_name = preg_replace('/[^A-Za-z0-9_\-\.]/', '_', $original_name);
        $dest = $uploads_dir . DIRECTORY_SEPARATOR . time() . '_' . $safe_name;
        if (move_uploaded_file($tmp_name, $dest)) {
            $public_path = 'uploads/' . basename($dest);
            $upload_link = $public_path;
            $email_body .= "<div class='field'><div class='label'>Resume:</div><div class='value'><a href='$public_path' target='_blank'>Download Resume</a></div></div>";
        } else {
            $email_body .= "<div class='field'><div class='label'>Resume:</div><div class='value'>Upload failed on server</div></div>";
        }
    }
}

$email_body .= "</div><div style=\"text-align:center;color:#777;padding-top:12px;font-size:12px\">Received on " . date('F j, Y \a\t g:i A') . "</div></div></body></html>";

// Auto-reply email content for user
$reply_subject = "Thank you for contacting Alaska Batteries";
$reply_body = "
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #c00d1e; color: white; padding: 20px; text-align: center; }
        .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
        .footer { background: #333; color: white; padding: 20px; }
        .footer a { color: #c00d1e; text-decoration: none; }
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
            <p style='margin-top: 20px; padding: 15px; background: white; border-left: 3px solid #c00d1e;'>
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
            Website: <a href='https://www.alaskabatteries.com'>alaskabatteries.com</a></p>
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
    // If PHPMailer is available (recommended), use it for authenticated SMTP
    $admin_sent = false;
    $user_sent = false;
    if (file_exists(__DIR__ . '/vendor/autoload.php')) {
        require_once __DIR__ . '/vendor/autoload.php';
    }

    if (class_exists('PHPMailer\PHPMailer\PHPMailer')) {
        // Use PHPMailer for reliable SMTP
        $mail = new PHPMailer\PHPMailer\PHPMailer(true);
        try {
            // Server settings
            $mail->isSMTP();
            $mail->Host = $smtp_host;
            $mail->SMTPAuth = true;
            $mail->Username = $smtp_username;
            $mail->Password = $smtp_password;
            $mail->SMTPSecure = PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port = $smtp_port;

            // Recipients & content for admin
            $mail->setFrom($smtp_from, $smtp_from_name);
            $mail->addAddress($smtp_to);
            $mail->addReplyTo($email, $name);
            $mail->isHTML(true);
            $mail->Subject = $email_subject;
            $mail->Body = $email_body;

            // Attach resume if uploaded
            if (!empty($dest) && file_exists($dest)) {
                $mail->addAttachment($dest);
            }

            $admin_sent = $mail->send();

            // Send auto-reply to user
            $mail->clearAllRecipients();
            $mail->setFrom($smtp_from, $smtp_from_name);
            $mail->addAddress($email);
            $mail->Subject = $reply_subject;
            $mail->Body = $reply_body;
            $user_sent = $mail->send();

        } catch (Exception $e) {
            error_log('PHPMailer exception: ' . $e->getMessage());
            // fallback to mail()
            $admin_sent = mail($smtp_to, $email_subject, $email_body, implode("\r\n", $headers_admin));
            $user_sent = mail($email, $reply_subject, $reply_body, implode("\r\n", $headers_user));
        }
    } else {
        // Send email to admin via PHP mail() fallback
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
    }

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
