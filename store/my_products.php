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

            <div class="col-lg-12 col-md-12 order-1">
                <div class="row" id="content-products-available">
                </div>
            </div>
        </div>
    </div>
    <!-- / Content -->
</div>
<!-- Content wrapper -->

<script src="<?= $BASE_URL_FRONT ?>store/js/my.products.js"></script>

<?php
require_once __DIR__ . "/../footer.php"
?>