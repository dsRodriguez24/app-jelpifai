<?php 
$BASE_URL_HOST_NODE_SERVER  = "http://localhost:3000/";
$BASE_URL_NODE_SERVER       = "http://localhost:3000/api/v1/";
$BASE_URL_FRONT             = "http://localhost/jelpifai-project/";
function format_currency($amount)
{
    return '$' . number_format((float)$amount, 0, '.', ',');
}

?>