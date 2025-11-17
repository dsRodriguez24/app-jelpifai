<?php 
// $BASE_URL_HOST_NODE_SERVER  = "http://localhost:3000/";
// $BASE_URL_NODE_SERVER       = "http://localhost:3000/api/v1/";
$BASE_URL_HOST_NODE_SERVER  = "https://rest-server-jelpifai.vercel.app/";
$BASE_URL_NODE_SERVER       = "https://rest-server-jelpifai.vercel.app/api/v1/";
$BASE_URL_FRONT             = "http://localhost/jelpifai-project/";
$BASE_URL_SUPABASE_FILES    = "https://sqgvytnqtxsoobzdxxbu.supabase.co/storage/v1/object/public/uploads/solicitudes/";

function format_currency($amount)
{
    return '$' . number_format((float)$amount, 0, '.', ',');
}

?>