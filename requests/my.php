<?php
require_once __DIR__ . "/../menu.php";
require_once __DIR__ . "/../header.php";
?>

<!-- Content wrapper -->
<div class="content-wrapper">
    <!-- Content -->

    <div class="container-xxl flex-grow-1 container-p-y">
        <div class="row">
            <?php require_once __DIR__ . "/navbar.php" ?>
            <?php require_once __DIR__ . "/modal_new.php" ?>
            <?php require_once __DIR__ . "/modal_porposal.php" ?>
            <?php require_once __DIR__ . "/modal_advances.php" ?>
            <?php require_once __DIR__ . "/modal_update.php" ?>
            <?php require_once __DIR__ . "/modal_points.php" ?>
            <?php require_once __DIR__ . "/modal_add_evidence_petitioner.php" ?>
            <?php require_once __DIR__ . "/offcanvas_chat.php" ?>

            <div class="col-lg-12 col-md-12 order-1">
                <div class="card">
                    <h5 class="card-header d-flex justify-content-end">
                        <div class="col-12 col-lg-4 col-xl-4 col-xs 12">
                            <input type="search" class="form-control" onkeyup="filter_rows(this.value, 'tbody-content-requests-my')" placeholder="Buscar...">
                        </div>
                    </h5>
                    <div class="table-responsive text-nowrap">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th style="width: 25%">Titulo</th>
                                    <th style="width: 20%">Fecha</th>
                                    <th style="width: 20%">Estado</th>
                                    <th style="width: 35%"></th>
                                </tr>
                            </thead>
                            <tbody id="tbody-content-requests-my" class="table-border-bottom-0"></tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>
    </div>
    <!-- / Content -->
</div>
<!-- Content wrapper -->
<script src="<?= $BASE_URL_FRONT ?>requests/js/my.js"></script>
<script src="<?= $BASE_URL_FRONT ?>requests/js/modal.js"></script>
<script src="<?= $BASE_URL_FRONT ?>requests/js/modal.porposal.request.js"></script>
<script src="<?= $BASE_URL_FRONT ?>requests/js/modal.advances.request.js"></script>
<script src="<?= $BASE_URL_FRONT ?>requests/js/modal.update.js"></script>
<script src="<?= $BASE_URL_FRONT ?>requests/js/modal.points.js"></script>
<script src="<?= $BASE_URL_FRONT ?>requests/js/modal.evidence.petioner.request.js"></script>
<script src="<?= $BASE_URL_FRONT ?>requests/js/offcanvas.chat.js"></script>
<link rel="stylesheet" href="<?= $BASE_URL_FRONT ?>requests/css/main.css">

<?php
require_once __DIR__ . "/../footer.php"
?>