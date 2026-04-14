<?php
/**
 * Дублирование заявок на elfprint@inbox.ru
 * POST JSON → mail() → JSON ответ
 */
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: https://elfprint.ru');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method Not Allowed']);
    exit;
}

$raw  = file_get_contents('php://input');
$data = json_decode($raw, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Bad JSON']);
    exit;
}

$to      = 'elfprint@inbox.ru';
$subject = isset($data['title']) ? $data['title'] : 'Новая заявка с сайта';
$page    = isset($data['page'])  ? $data['page']  : '';
$name    = isset($data['name'])  ? trim($data['name'])  : '';
$phone   = isset($data['phone']) ? trim($data['phone']) : '';
$email   = isset($data['email']) ? trim($data['email']) : '';
$comment = isset($data['comment']) ? trim($data['comment']) : '';
$product = isset($data['product']) ? trim($data['product']) : '';
$service = isset($data['service']) ? trim($data['service']) : '';
$qty     = isset($data['quantity']) ? trim($data['quantity']) : '';
$deadline= isset($data['deadline']) ? trim($data['deadline']) : '';

$body  = "Новая заявка с сайта elfprint.ru\n";
$body .= "==========================================\n\n";
if ($name)    $body .= "Имя:          $name\n";
if ($phone)   $body .= "Телефон:      $phone\n";
if ($email)   $body .= "Email:        $email\n";
if ($product) $body .= "Изделие:      $product\n";
if ($service) $body .= "Технология:   $service\n";
if ($qty)     $body .= "Количество:   $qty шт.\n";
if ($deadline)$body .= "Срок:         $deadline\n";
if ($comment) $body .= "\nКомментарий:\n$comment\n";
$body .= "\n==========================================\n";
$body .= "Страница: $page\n";
$body .= "Дата:     " . date('d.m.Y H:i') . " (МСК)\n";

$headers  = "From: no-reply@elfprint.ru\r\n";
$headers .= "Reply-To: no-reply@elfprint.ru\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "X-Mailer: elfprint-site\r\n";

$subject_encoded = '=?UTF-8?B?' . base64_encode($subject) . '?=';

$ok = mail($to, $subject_encoded, $body, $headers);

echo json_encode(['ok' => $ok]);
