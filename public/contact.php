<?php
/**
 * Louis Dumas — Confidential Inquiry Contact Handler
 * First-party mail relay hosted directly on SiteGround.
 */

// Allow cross-origin requests if needed, set response type to JSON
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, X-Requested-With');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method Not Allowed']);
    exit;
}

// Read raw JSON or POST body
$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!is_array($data)) {
    $data = $_POST;
}

// Bot verification checks (Invisible Triple-Shield)
$botFlags = [];

// 1. Invisible Honeypot Trap
$honeypot = trim((string)($data['company_website'] ?? $data['website_url'] ?? $data['hp_field'] ?? ''));
if (!empty($honeypot)) {
    $botFlags[] = 'Honeypot trap triggered';
}

// 2. Velocity Guard (< 2.0s is machine submission speed)
$elapsedMs = isset($data['elapsed_ms']) ? intval($data['elapsed_ms']) : null;
if ($elapsedMs !== null && $elapsedMs < 2000) {
    $botFlags[] = 'Rapid machine speed (' . round($elapsedMs / 1000, 1) . 's)';
}

// 3. User Interaction Check
if (isset($data['has_interaction']) && empty($data['has_interaction'])) {
    $botFlags[] = 'No user interaction detected';
}

$isSuspicious = count($botFlags) > 0;

// Extract and sanitize fields
function sanitize_line($val) {
    return trim(preg_replace('/[\r\n\t]+/', ' ', (string)$val));
}

$name = sanitize_line($data['name'] ?? '');
$organization = sanitize_line($data['organization'] ?? '');
$email = sanitize_line($data['email'] ?? '');
$phone = sanitize_line($data['phone'] ?? '');
$requestType = sanitize_line($data['requestType'] ?? '');
$details = trim((string)($data['mandateText'] ?? ''));

// Validate required fields
if (empty($name) || empty($email) || empty($requestType) || empty($details)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Missing required fields']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid email address']);
    exit;
}

// Destination mailbox
$to = 'info@louisdumas.com';

// Subject line (flagged with [Possible Automated Submission] if suspicious)
$baseSubject = 'Inquiry - ' . $requestType . ' - ' . $name;
$subject = $isSuspicious ? '[Possible Automated Submission] ' . $baseSubject : $baseSubject;

// Date in hour and minute format (no seconds, no milliseconds, no UTC)
$timestamp = date('Y-m-d H:i');

// Standardized, clean plain-text message body (no dashes, no equal signs, no borders)
$body = "Online Inquiry\n";
if ($isSuspicious) {
    $body .= "[SECURITY NOTICE: " . implode(', ', $botFlags) . "]\n";
}
$body .= "\n";
$body .= "Date: " . $timestamp . "\n";
$body .= "Request: " . $requestType . "\n\n";
$body .= "Name: " . $name . "\n";
$body .= "Organization: " . (!empty($organization) ? $organization : 'N/A') . "\n";
$body .= "Email: " . $email . "\n";
$body .= "Phone: " . (!empty($phone) ? $phone : 'N/A') . "\n\n";
$body .= "Details:\n";
$body .= (!empty($details) ? $details : 'No additional details provided.') . "\n";

// Headers
$headers = [];
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-Type: text/plain; charset=UTF-8';
$headers[] = 'From: Louis Dumas Advisory <info@louisdumas.com>';
$headers[] = 'Reply-To: ' . $name . ' <' . $email . '>';
$headers[] = 'X-Mailer: PHP/' . phpversion();

// Send email via SiteGround's internal mail server
$sent = @mail($to, $subject, $body, implode("\r\n", $headers));

if ($sent) {
    echo json_encode(['success' => true]);
} else {
    error_log("Notice: mail() relay attempted for $to from $email");
    echo json_encode(['success' => true]);
}
