<?php 
require_once __DIR__ . "/menu.php";
?>

<script>
    localStorage.removeItem("token");
    window.location.href = BASE_URL_FRONT;
</script>