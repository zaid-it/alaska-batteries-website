<?php
/**
 * Alaska Batteries Contact Form Email Handler
 * This file should be uploaded to your Hostinger server
 */

// Enable error reporting for debugging (remove in production)
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);

// Load configuration (prefer a `config.php` placed outside webroot)
$cfg = [];
if (file_exists(__DIR__ . '/../config.php')) {
    $cfg = include __DIR__ . '/../config.php';
} elseif (file_exists(__DIR__ . '/config.php')) {
    $cfg = include __DIR__ . '/config.php';
}

// CORS: allow only configured origins (production). Use whitelist from config.php if provided.
$allowed_origins = $cfg['allowed_origins'] ?? [
    'https://www.alaskabatteries.com'
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin) {
    if (in_array($origin, $allowed_origins, true)) {
        header('Access-Control-Allow-Origin: ' . $origin);
        header('Access-Control-Allow-Credentials: true');
    } else {
        // Reject unknown origins
        http_response_code(403);
        header('Content-Type: application/json');
        echo json_encode(['success' => false, 'message' => 'Origin not allowed']);
        exit();
    }
} else {
    // No Origin header (e.g., same-origin or server-to-server), set Host as origin
    $hostOrigin = (!empty($_SERVER['HTTP_HOST']) ? (isset($_SERVER['HTTPS']) ? 'https://' : 'http://') . $_SERVER['HTTP_HOST'] : '*');
    header('Access-Control-Allow-Origin: ' . $hostOrigin);
}

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
// Defaults can be overridden by `config.php` included above. Keep real credentials in config.php
// placed outside webroot and not committed to source control.
// ============================
$smtp_host = $cfg['smtp_host'] ?? 'smtp.hostinger.com';
$smtp_port = $cfg['smtp_port'] ?? 587;
$smtp_username = $cfg['smtp_user'] ?? $cfg['smtp_username'] ?? 'info@alaskabatteries.com';
$smtp_password = $cfg['smtp_pass'] ?? $cfg['smtp_password'] ?? '';
$smtp_from = $cfg['smtp_from'] ?? 'info@alaskabatteries.com';
$smtp_from_name = $cfg['smtp_from_name'] ?? 'Alaska Batteries Website';

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
$email_body = '<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"/><style>body{margin:0;padding:0;background:#f4f5f7;font-family:Arial,Helvetica,sans-serif;color:#333}a{color:#c00d1e}</style></head><body><table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#f4f5f7;padding:30px 0"><tr><td align="center"><table width="600" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;border-radius:6px;overflow:hidden;box-shadow:0 2px 6px rgba(0,0,0,0.08)"><tr><td style="background:#c00d1e;padding:18px 20px;text-align:center;color:#ffffff"><img src="https://www.alaskabatteries.com/assets/logo.png" alt="Alaska Batteries" width="140" style="display:block;margin:0 auto 8px"/><h2 style="margin:0;font-size:18px;font-weight:700;letter-spacing:0.6px">Website Submission</h2></td></tr><tr><td style="padding:20px"><table width="100%" cellpadding="0" cellspacing="0" role="presentation">';

$email_body .= "<tr><td style='padding:10px 0;font-weight:700;color:#c00d1e;width:160px;vertical-align:top'>Name</td><td style='padding:10px 0;vertical-align:top'>".htmlspecialchars($name)."</td></tr>";
$email_body .= "<tr><td style='padding:10px 0;font-weight:700;color:#c00d1e;vertical-align:top'>Email</td><td style='padding:10px 0;vertical-align:top'><a href='mailto:".htmlspecialchars($email)."'>".htmlspecialchars($email)."</a></td></tr>";
$email_body .= "<tr><td style='padding:10px 0;font-weight:700;color:#c00d1e;vertical-align:top'>Phone</td><td style='padding:10px 0;vertical-align:top'>".htmlspecialchars($phone)."</td></tr>";
if ($company) $email_body .= "<tr><td style='padding:10px 0;font-weight:700;color:#c00d1e;vertical-align:top'>Company</td><td style='padding:10px 0;vertical-align:top'>".htmlspecialchars($company)."</td></tr>";
$email_body .= "<tr><td style='padding:10px 0;font-weight:700;color:#c00d1e;vertical-align:top'>Subject</td><td style='padding:10px 0;vertical-align:top'>".htmlspecialchars($subject)."</td></tr>";
$email_body .= "<tr><td style='padding:10px 0;font-weight:700;color:#c00d1e;vertical-align:top'>Message</td><td style='padding:10px 0;vertical-align:top'>".nl2br(htmlspecialchars($message))."</td></tr>";

// Include primary interests for dealer form if provided
if ($form_type === 'dealer' && !empty($interests)) {
    $email_body .= "<tr><td style='padding:10px 0;font-weight:700;color:#c00d1e;vertical-align:top'>Primary Interest(s)</td><td style='padding:10px 0;vertical-align:top'>".htmlspecialchars(implode(', ', $interests))."</td></tr>";
}

// Handle resume upload if present (careers)
$upload_link = '';
if ($form_type === 'careers') {
    $file_key = !empty($_FILES['resume']['name']) ? 'resume' : ( !empty($_FILES['careers-resume']['name']) ? 'careers-resume' : null );
    if ($file_key && isset($_FILES[$file_key]) && $_FILES[$file_key]['error'] === UPLOAD_ERR_OK) {
        $uploads_dir = __DIR__ . DIRECTORY_SEPARATOR . 'uploads';
        if (!is_dir($uploads_dir)) mkdir($uploads_dir, 0755, true);

        $file = $_FILES[$file_key];
        $tmp_name = $file['tmp_name'];
        $original_name = basename($file['name']);

        // Validate file size (max 5MB)
        $maxBytes = 5 * 1024 * 1024;
        if ($file['size'] > $maxBytes) {
            $email_body .= "<div class='field'><div class='label'>Resume:</div><div class='value'>File too large (max 5MB)</div></div>";
        } else {
            // Validate MIME type and extension
            $finfo = new finfo(FILEINFO_MIME_TYPE);
            $mime = $finfo->file($tmp_name);
            $allowed_mimes = [
                'application/pdf' => 'pdf',
                'application/msword' => 'doc',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document' => 'docx'
            ];

            $ext = strtolower(pathinfo($original_name, PATHINFO_EXTENSION));
            $validMime = in_array($mime, array_keys($allowed_mimes), true);
            $validExt = in_array($ext, $allowed_mimes, true) || in_array($ext, $allowed_mimes, true);

            if (!$validMime && !$validExt) {
                $email_body .= "<div class='field'><div class='label'>Resume:</div><div class='value'>Invalid file type. Allowed: PDF, DOC, DOCX</div></div>";
            } else {
                $safe_name = preg_replace('/[^A-Za-z0-9_\-\.]/', '_', $original_name);
                $dest = $uploads_dir . DIRECTORY_SEPARATOR . time() . '_' . $safe_name;
                    if (move_uploaded_file($tmp_name, $dest)) {
                    $public_path = 'uploads/' . basename($dest);
                    $upload_link = $public_path;
                    $email_body .= "<tr><td style='padding:10px 0;font-weight:700;color:#c00d1e;vertical-align:top'>Resume</td><td style='padding:10px 0;vertical-align:top'><a href='$public_path' target='_blank' rel='noopener noreferrer'>Download Resume</a></td></tr>";
                } else {
                    $email_body .= "<tr><td style='padding:10px 0;font-weight:700;color:#c00d1e;vertical-align:top'>Resume</td><td style='padding:10px 0;vertical-align:top'>Upload failed on server</td></tr>";
                }
            }
        }
    }
}

$email_body .= "</table></td></tr><tr><td style='background:#fafafa;padding:12px 20px;text-align:center;color:#777;font-size:12px'>Received on " . date('F j, Y \a\t g:i A') . "</td></tr><tr><td style='padding:18px;background:#ffffff;text-align:center;font-size:12px;color:#666;border-top:1px solid #eee'>Alaska Batteries — <a href='https://www.alaskabatteries.com'>alaskabatteries.com</a></td></tr></table></td></tr></table></body></html>";

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
            // ensure envelope-sender matches authenticated SMTP user
            $mail->Sender = $smtp_from;
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
            // write debug info (temporary)
            $logs_dir = __DIR__ . DIRECTORY_SEPARATOR . 'logs';
            if (!is_dir($logs_dir)) @mkdir($logs_dir, 0755, true);
            $debug_file = $logs_dir . DIRECTORY_SEPARATOR . 'email-debug.txt';
            $dbg = "[" . date('c') . "] PHPMailer exception: " . $e->getMessage() . "\n";
            if (isset($mail) && method_exists($mail, 'ErrorInfo')) {
                $dbg .= "PHPMailer ErrorInfo: " . $mail->ErrorInfo . "\n";
            }
            $dbg .= "Request data: " . json_encode(array_filter([ 'form' => $form_type, 'name' => $name, 'email' => $email, 'phone' => $phone ])) . "\n\n";
            @file_put_contents($debug_file, $dbg, FILE_APPEND | LOCK_EX);

            // fallback to mail() — include envelope sender (-f) to set Return-Path
            $admin_sent = mail($smtp_to, $email_subject, $email_body, implode("\r\n", $headers_admin), "-f" . escapeshellarg($smtp_from));
            $user_sent = mail($email, $reply_subject, $reply_body, implode("\r\n", $headers_user), "-f" . escapeshellarg($smtp_from));
        }
    } else {
        // Send email to admin via PHP mail() fallback
        $admin_sent = mail(
            $smtp_to,
            $email_subject,
            $email_body,
            implode("\r\n", $headers_admin),
            "-f" . escapeshellarg($smtp_from)
        );

        // Send auto-reply to user
        $user_sent = mail(
            $email,
            $reply_subject,
            $reply_body,
            implode("\r\n", $headers_user),
            "-f" . escapeshellarg($smtp_from)
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
    // write debug info (temporary)
    $logs_dir = __DIR__ . DIRECTORY_SEPARATOR . 'logs';
    if (!is_dir($logs_dir)) @mkdir($logs_dir, 0755, true);
    $debug_file = $logs_dir . DIRECTORY_SEPARATOR . 'email-debug.txt';
    $dbg = "[" . date('c') . "] General exception: " . $e->getMessage() . "\n";
    $dbg .= "Request data: " . json_encode(array_filter([ 'form' => $form_type, 'name' => $name, 'email' => $email, 'phone' => $phone ])) . "\n\n";
    @file_put_contents($debug_file, $dbg, FILE_APPEND | LOCK_EX);
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Failed to send message. Please try again or contact us directly.'
    ]);
}
?>
