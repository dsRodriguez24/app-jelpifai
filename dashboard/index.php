<?php
require_once __DIR__ . "/../menu.php";
require_once __DIR__ . "/../header.php";
?>


<!-- / Navbar -->

<!-- Content wrapper -->
<div class="content-wrapper">
    <!-- Content -->

    <div class="container-xxl flex-grow-1 container-p-y">
        <div class="row">
            <div class="col-lg-12 mb-4 order-0">
                <div class="card">
                    <div class="d-flex align-items-end row">
                        <div class="col-sm-7">
                            <div class="card-body">
                                <h5 class="card-title text-primary" id="h5-title-welcome">Bienvenido </h5>
                            </div>
                        </div>
                        <div class="col-sm-5 text-center text-sm-left">
                            <div class="card-body pb-0 px-0 px-md-4">
                                <img src="../assets/img/illustrations/man-with-laptop-light.png" height="140" alt="View Badge User" data-app-dark-img="illustrations/man-with-laptop-dark.png" data-app-light-img="illustrations/man-with-laptop-light.png" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-lg-12 col-md-12 order-1">
                <div class="row">
                    <?php
                    // Datos de ejemplo: puedes obtenerlos de una DB o API
                    $cards = [
                        [
                            'title' => 'Tareas finalizadas esta semana',
                            'value' => "",
                            'change' => "",
                            'icon'  => 'fas fa-calendar-check text-success',
                            'alt'   => 'chart success',
                            'id_text'   => 'task-finished'
                        ],
                        [
                            'title' => 'Tareas pendientes',
                            'value' => "",
                            'change' => "",
                            'icon'  => 'fas fa-info text-danger',
                            'alt'   => 'Credit Card',
                            'id_text'   => 'task-pending'
                        ],
                        [
                            'title' => 'Solicitudes nuevas el dia de hoy',
                            'value' => "",
                            'change' => "",
                            'icon'  => 'fas fa-people-roof text-info',
                            'alt'   => 'Paypal',
                            'id_text'   => 'new-request'
                        ],
                        [
                            'title' => 'Puntos ganados esta semana',
                            'value' => "",
                            'change' => "",
                            'icon'  => 'fas fa-star text-warning',
                            // 'icon'  => '../assets/img/icons/unicons/cc-primary.png',
                            'alt'   => 'Credit Card',
                            'id_text'   => 'points-gained'
                        ],
                    ];

                    // Recorremos y renderizamos las cards
                    foreach ($cards as $card) {
                        // sanitizar para evitar XSS
                        $title  = htmlspecialchars($card['title'], ENT_QUOTES, 'UTF-8');
                        $value  = $card['value'];
                        $id_text = $card['id_text'];
                        $change = (float)$card['change'];
                        $icon   = htmlspecialchars($card['icon'], ENT_QUOTES, 'UTF-8');
                        $alt    = htmlspecialchars($card['alt'], ENT_QUOTES, 'UTF-8');

                        // determinar clase e icono según si el cambio es positivo o negativo
                        $isPositive  = $change >= 0;
                        $changeClass = $isPositive ? 'text-success fw-semibold' : 'text-danger fw-semibold';
                        $changeIcon  = $isPositive ? 'bx bx-up-arrow-alt' : 'bx bx-down-arrow-alt';
                        $changeText  = ($isPositive ? '+' : '') . number_format($change, 2) . '%';
                    ?>
                        <div class="col-lg-6 col-md-12 col-12 col-xs-12 mb-4">
                            <div class="card">
                                <div class="card-body">
                                    <div class="card-title d-flex align-items-start justify-content-between mb-1">
                                        <div class="avatar flex-shrink-0">
                                            <h3> <i class="<?= $icon ?>" ></i> </h3>
                                            <!-- <img src="<?php echo $icon; ?>" alt="<?php echo $alt; ?>" class="rounded" /> -->
                                        </div>
                                    </div>

                                    <span class="<?php echo ($title === 'Profit' || $title === 'Transactions') ? 'fw-semibold d-block mb-1' : 'd-block mb-1'; ?>">
                                        <?php echo $title; ?>
                                    </span>

                                    <h3 class="card-title mb-2"  id="<?= $id_text ?>"><?php echo $value ?></h3>
                                    <!-- <h3 class="card-title mb-2"><?php echo format_currency($value); ?></h3> -->

                                    <!-- <small class="<?php echo $changeClass; ?>">
                                        <i class="<?php echo $changeIcon; ?>"></i> <?php echo $changeText; ?>
                                    </small> -->
                                </div>
                            </div>
                        </div>
                    <?php
                    }
                    ?>
                    <div class="col-lg-12 col-md-12 col-12 col-xs-12 mb-4">
                        <div class="card">
                            <div class="card-body">
                                <div id="chart"></div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
    <!-- / Content -->

</div>
<!-- Content wrapper -->
<?php
require_once __DIR__ . "/../footer.php"
?>
<script src="<?= $BASE_URL_FRONT ?>dashboard/js/index.js"></script>