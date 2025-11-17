<?php
$available_active   = false;
$my_active          = false;
$accepted_active    = false;

$ruta_actual = basename($_SERVER['PHP_SELF']);
if ($ruta_actual == "index.php") {
    $available_active = true;
} elseif ($ruta_actual == "my.php") {
    $my_active = true;
} elseif ($ruta_actual == "accepted.php") {
    $accepted_active = true;
}

?>

<div class="col-md-12">
    <div class="nav-align-top">
        <div class="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center mb-3">

            <ul class="nav nav-pills flex-column flex-sm-row mb-3 mb-sm-0 gap-sm-0 gap-2 w-100 w-sm-auto">
                <li class="nav-item">
                    <a class="nav-link <?= $available_active ? 'active' : '' ?>"
                        href="<?= $available_active ? '#' : ($BASE_URL_FRONT . 'requests') ?>">
                        <i class="icon-base bx bx-user icon-sm me-1_5"></i> Disponibles
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link <?= $my_active ? 'active' : '' ?>"
                        href="<?= $my_active ? '#' : ($BASE_URL_FRONT . 'request/my') ?>">
                        <i class="icon-base bx bx-group icon-sm me-1_5"></i> Mis solicitudes
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link <?= $accepted_active ? 'active' : '' ?>"
                        href="<?= $accepted_active ? '#' : ($BASE_URL_FRONT . 'request/accepted') ?>">
                        <i class="icon-base bx bx-grid-alt icon-sm me-1_5"></i> Aceptadas
                    </a>
                </li>
            </ul>

            <button class="btn btn-secondary mt-2 mt-sm-0 custom-btn-responsive" data-bs-toggle="modal" data-bs-target="#modal-new-request">
                <i class="bx bx-plus"></i>Nuevo
            </button>

        </div>
    </div>
</div>