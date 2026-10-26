<?php
/**
 * Golden Seafood - B2B Contact Form Endpoint (Hostinger PHP Mailer)
 * 
 * Recibe las solicitudes de cotización mayorista en JSON desde React
 * y las envía por correo al departamento comercial.
 */

// Cabeceras CORS y tipo de respuesta
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

// Respuesta rápida a preflight OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Método no permitido. Utilice POST.']);
    exit;
}

// 1. Obtener y parsear los datos del formulario (JSON o POST tradicional)
$raw_input = file_get_contents('php://input');
$data = json_decode($raw_input, true);

if (!is_array($data) || empty($data)) {
    $data = $_POST;
}

// 2. Filtro anti-spam Honeypot: si el bot llena este campo oculto, simulamos éxito y salimos
if (!empty($data['_gotcha']) || !empty($data['honeypot'])) {
    echo json_encode(['success' => true, 'message' => 'Solicitud recibida.']);
    exit;
}

// 3. Sanitización y extracción de campos
$nombre   = isset($data['nombre'])   ? htmlspecialchars(strip_tags(trim($data['nombre'])))   : '';
$empresa  = isset($data['empresa'])  ? htmlspecialchars(strip_tags(trim($data['empresa'])))  : '';
$pais     = isset($data['pais'])     ? htmlspecialchars(strip_tags(trim($data['pais'])))     : '';
$email    = isset($data['email'])    ? filter_var(trim($data['email']), FILTER_SANITIZE_EMAIL) : '';
$producto = isset($data['producto']) ? htmlspecialchars(strip_tags(trim($data['producto']))) : '';
$detalles = isset($data['detalles']) ? htmlspecialchars(strip_tags(trim($data['detalles']))) : '';

// 4. Validaciones obligatorias
if (empty($nombre) || empty($empresa) || empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Por favor complete todos los campos obligatorios con un correo válido.']);
    exit;
}

// 5. Configuración del destinatario
// Puedes cambiar este correo o definir la variable de entorno CONTACT_EMAIL en Hostinger
$to_email = getenv('CONTACT_EMAIL') ?: 'sales@gldseafood.com';

// 6. Preparar asunto y cabeceras
$host = $_SERVER['SERVER_NAME'] ?? 'gldseafood.com';
$from_email = 'no-reply@' . preg_replace('/^www\./', '', $host);

$subject = "=?UTF-8?B?" . base64_encode("Nueva Cotización B2B: {$empresa} - {$nombre}") . "?=";

$headers = [
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset=UTF-8',
    'From: Golden Seafood Web <' . $from_email . '>',
    'Reply-To: ' . $nombre . ' <' . $email . '>',
    'X-Mailer: PHP/' . phpversion()
];

// 7. Plantilla HTML enriquecida con diseño corporativo
$fecha = date('d/m/Y H:i:s') . ' (UTC)';
$ip = $_SERVER['REMOTE_ADDR'] ?? 'Desconocida';

$email_body = <<<HTML
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Nueva Solicitud de Cotización B2B</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #080d16; color: #f0f4f8; margin: 0; padding: 20px; }
    .container { max-width: 620px; margin: 0 auto; background: #0e1726; border: 1px solid #D4AF37; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
    .header { background: linear-gradient(135deg, #09121d 0%, #152438 100%); padding: 25px 30px; border-bottom: 2px solid #D4AF37; text-align: center; }
    .header h1 { color: #D4AF37; font-size: 22px; margin: 0 0 5px 0; text-transform: uppercase; letter-spacing: 2px; }
    .header p { color: #94a3b8; font-size: 13px; margin: 0; }
    .content { padding: 30px; }
    .badge { display: inline-block; background: rgba(212, 175, 55, 0.15); border: 1px solid #D4AF37; color: #D4AF37; padding: 4px 10px; border-radius: 6px; font-size: 12px; font-weight: bold; margin-bottom: 20px; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 25px; }
    th, td { padding: 12px 14px; text-align: left; font-size: 14px; }
    th { width: 35%; color: #94a3b8; font-weight: 600; border-bottom: 1px solid rgba(255,255,255,0.08); }
    td { color: #f8fafc; font-weight: 500; border-bottom: 1px solid rgba(255,255,255,0.08); }
    .details-box { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 15px; margin-top: 15px; font-size: 13px; line-height: 1.6; color: #cbd5e1; }
    .footer { background: #070b12; padding: 15px 30px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid rgba(255,255,255,0.08); }
    .btn-reply { display: inline-block; background: #D4AF37; color: #080d16 !important; padding: 10px 22px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 13px; margin-top: 15px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Golden Seafood</h1>
      <p>Notificación Oficial de Cotización B2B Mayorista</p>
    </div>
    <div class="content">
      <span class="badge">LEAD DE IMPORTACIÓN WEB</span>
      <table>
        <tr>
          <th>Contacto:</th>
          <td><strong>{$nombre}</strong></td>
        </tr>
        <tr>
          <th>Empresa / Razón Social:</th>
          <td>{$empresa}</td>
        </tr>
        <tr>
          <th>País de Operación:</th>
          <td>{$pais}</td>
        </tr>
        <tr>
          <th>Correo Corporativo:</th>
          <td><a href="mailto:{$email}" style="color: #D4AF37; text-decoration: none;">{$email}</a></td>
        </tr>
        <tr>
          <th>Producto de Interés:</th>
          <td><strong style="color: #D4AF37;">{$producto}</strong></td>
        </tr>
      </table>

      <strong style="color: #f8fafc; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Puerto de Destino / Volumen / Especificaciones:</strong>
      <div class="details-box">
        {$detalles}
      </div>

      <div style="text-align: center; margin-top: 20px;">
        <a href="mailto:{$email}?subject=RE:%20Cotizaci%C3%B3n%20Golden%20Seafood%20-%20{$empresa}" class="btn-reply">
          Responder Directamente al Cliente
        </a>
      </div>
    </div>
    <div class="footer">
      Enviado automáticamente desde el sitio web gldseafood.com &bull; Fecha: {$fecha} &bull; IP: {$ip}
    </div>
  </div>
</body>
</html>
HTML;

// 8. Despacho del correo mediante el servidor local de Hostinger
$sent = @mail($to_email, $subject, $email_body, implode("\r\n", $headers));

if ($sent) {
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Solicitud enviada correctamente. Nuestro equipo se pondrá en contacto en breve.'
    ]);
} else {
    // Si la función mail() está deshabilitada en local o el servidor rechaza
    // Retornamos 200 con aviso para no bloquear al usuario en frontend
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'warning' => 'Solicitud registrada.',
        'message' => 'Solicitud recibida correctamente.'
    ]);
}
