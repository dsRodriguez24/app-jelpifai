<?php 
error_reporting(0);
require_once __DIR__ . "/php/helpers.php";
?>

<!DOCTYPE html>
<html lang="en" class="light-style layout-menu-fixed" dir="ltr" data-theme="theme-default" data-assets-path="../assets/" data-template="vertical-menu-template-free">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0" />
    <title>Jelpifai</title>
    <meta name="description" content="" />
    <!-- Favicon -->
    <link rel="icon" type="image/x-icon" href="../assets/img/favicon/favicon.ico" />
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet" />
    <!-- Icons. Uncomment required icon fonts -->
    <link rel="stylesheet" href="../assets/vendor/fonts/boxicons.css" />
    <!-- Core CSS -->
    <link rel="stylesheet" href="../assets/vendor/css/core.css" class="template-customizer-core-css" />
    <link rel="stylesheet" href="../assets/vendor/css/theme-default.css" class="template-customizer-theme-css" />
    <link rel="stylesheet" href="../assets/css/demo.css" />
    <link rel="stylesheet" href="../assets/css/index.css" />
    <!-- Vendors CSS -->
    <link rel="stylesheet" href="../assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css" />
    <link rel="stylesheet" href="../assets/vendor/libs/apex-charts/apex-charts.css" />
    <!-- Page CSS -->
    <!-- Helpers -->
    <script src="../assets/vendor/js/helpers.js"></script>
    <!--! Template customizer & Theme config files MUST be included after core stylesheets and helpers.js in the <head> section -->
    <!--? Config:  Mandatory theme config file contain global vars & default theme options, Set your preferred theme option in this file.  -->
    <script src="../assets/js/config.js"></script>

    <!-- SweetAlert -->
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    
    <!-- ApexCharts -->
    <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
    
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css"/>
    
    <!-- SocketIo -->
    <script src="https://cdn.socket.io/4.7.5/socket.io.min.js"></script>

    <!-- Jquery -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>

    <!-- Select2 -->
    <!-- <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
    <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script> -->

    <script>
        const BASE_URL_HOST_NODE_SERVER   = `<?=$BASE_URL_HOST_NODE_SERVER?>`;
        const BASE_URL_NODE_SERVER        = `<?=$BASE_URL_NODE_SERVER?>`;
        const BASE_URL_FRONT              = `<?=$BASE_URL_FRONT?>`;
        const BASE_URL_SUPABASE_FILES     = `<?=$BASE_URL_SUPABASE_FILES?>`;
    </script>
    <script src="<?= $BASE_URL_FRONT ?>js/validar_sesion.js"></script>
    <script src="<?= $BASE_URL_FRONT ?>js/header.js"></script>
    <script src="<?= $BASE_URL_FRONT ?>js/functions.js"></script>
    <script src="<?= $BASE_URL_FRONT ?>js/socket.io.events.js"></script>
    <script src="<?= $BASE_URL_FRONT ?>js/notification.js"></script>

</head>
<body>
    <!-- Layout wrapper -->
    <div class="layout-wrapper layout-content-navbar">
        <div class="layout-container">
            <!-- Menu -->
            <aside id="layout-menu" class="layout-menu menu-vertical menu bg-menu-theme">
                <div class="app-brand demo">
                    <center>
                    <a href="<?=$BASE_URL_FRONT?>dashboard" class="app-brand-link">
                            <img src="<?=$BASE_URL_FRONT?>img/logo.png" style="max-height: 8vh ;">
                    </a>
                    </center>
                        
                    <a href="javascript:void(0);" class="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none">
                        <i class="bx bx-chevron-left bx-sm align-middle"></i>
                    </a>
                </div>

                <div class="menu-inner-shadow"></div>

                <ul class="menu-inner py-1">
                    <?php 
                    $url_actual    = $_SERVER['REQUEST_URI'];
                    $url_actual    = explode("/", $url_actual);
                    $url_actual_1  = $url_actual[3];
                    $url_actual    = $url_actual[2];
                    $array_menu = [
                        "Dashboard"   => ["dashboard", "bx bx-home-circle", [] ],
                        "Solicitudes" => ["requests", "bx bx-message-minus", ["my", "accepted"] ],
                        "Tienda"      => ["store", "bx  bx-store", ["products"] ],
                    ];
                    foreach ($array_menu as $name => $array_detalle) { 
                        $is_active = ($url_actual == $array_detalle[0] || in_array($url_actual_1, $array_detalle[2])) ? "active" : "";
                        ?>
                        <li class="menu-item <?= $is_active ?>">
                            <a href="<?=$BASE_URL_FRONT?><?=$array_detalle[0]?>" class="menu-link">
                                <i class="menu-icon tf-icons <?= $array_detalle[1] ?>"></i>
                                <div data-i18n="Analytics"><?= $name ?></div>
                            </a>
                        </li>
                    <?php 
                    }
                    ?>
                    <li class="menu-item">
                        <a href="<?=$BASE_URL_FRONT?>logout" class="menu-link text-danger">
                            <i class="menu-icon tf-icons bx bx-x"></i>
                            <div data-i18n="Analytics">Cerrar sesion</div>
                        </a>
                    </li>
                </ul>
            </aside>
            <!-- / Menu -->

            <!-- Layout container -->
            <div class="layout-page">
                <!-- Navbar -->