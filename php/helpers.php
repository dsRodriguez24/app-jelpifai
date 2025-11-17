<?php 
// $BASE_URL_HOST_NODE_SERVER  = "http://localhost:3000/";
// $BASE_URL_NODE_SERVER       = "http://localhost:3000/api/v1/";
$BASE_URL_HOST_NODE_SERVER  = "https://rest-server-jelpifai.vercel.app/";
$BASE_URL_NODE_SERVER       = "https://rest-server-jelpifai.vercel.app/api/v1/";

// URL dinámica para Railway
$protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
$host = $_SERVER['HTTP_HOST'] ?? $_SERVER['SERVER_NAME'];
$BASE_URL_FRONT = $protocol . "://" . $host . "/";

$BASE_URL_SUPABASE_FILES    = "https://sqgvytnqtxsoobzdxxbu.supabase.co/storage/v1/object/public/uploads/solicitudes/";

function format_currency($amount)
{
    return '$' . number_format((float)$amount, 0, '.', ',');
}

?>