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
            <?php require_once __DIR__ . "/modal_detail.php" ?>

            <div class="col-lg-12 col-md-12 order-1">
                <div class="row" id="content-requests-available">
                </div>
            </div>
        </div>
    </div>
    <!-- / Content -->
</div>
<!-- Content wrapper -->

<script src="<?= $BASE_URL_FRONT ?>requests/js/index.js"></script>
<script src="<?= $BASE_URL_FRONT ?>requests/js/modal.js"></script>
<script src="<?= $BASE_URL_FRONT ?>requests/js/modal.detail.js"></script>
<link rel="stylesheet" href="<?= $BASE_URL_FRONT ?>requests/css/main.css">

<?php
require_once __DIR__ . "/../footer.php"
?>