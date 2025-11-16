<?php
$products_active    = false;
$my_products_active = false;

$ruta_actual = basename($_SERVER['PHP_SELF']);
if ($ruta_actual == "index.php") {
    $products_active = true;
} elseif ($ruta_actual == "my_products.php") {
    $my_products_active = true;
}

?>

<div class="col-md-12">
    <div class="nav-align-top">
        <div class="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center mb-3">

            <ul class="nav nav-pills flex-column flex-sm-row mb-3 mb-sm-0 gap-sm-0 gap-2 w-100 w-sm-auto">
                <li class="nav-item">
                    <a class="nav-link <?= $products_active ? 'active' : '' ?>"
                        href="<?= $products_active ? '#' : ($BASE_URL_FRONT . 'store') ?>">
                        <i class="icon-base bx  bx-store icon-sm me-1_5"></i> Productos
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link <?= $my_products_active ? 'active' : '' ?>"
                        href="<?= $my_products_active ? '#' : ($BASE_URL_FRONT . 'my/products') ?>">
                        <i class="icon-base bx bx-group icon-sm me-1_5"></i> Mis productos
                    </a>
                </li>
            </ul>

        </div>
    </div>
</div>