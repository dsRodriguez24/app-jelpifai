<nav class="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme" id="layout-navbar">
    <div class="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
        <a class="nav-item nav-link px-0 me-xl-4" href="javascript:void(0)">
            <i class="bx bx-menu bx-sm"></i>
        </a>
    </div>

    <div class="navbar-nav-right d-flex align-items-center" id="navbar-collapse">
        <!-- Search -->
        <div class="navbar-nav align-items-center">
            <div class="nav-item d-flex align-items-center">
            </div>
        </div>
        <!-- /Search -->

        <ul class="navbar-nav flex-row align-items-center ms-auto">
            <li class="nav-item lh-1 me-3">
                <a class="btn btn-sm btn-primary text-white" id="header-total-points">

                </a>
                <!-- <a class="github-button" data-icon="octicon-star" data-size="large" data-show-count="true" id="header-total-points"></a> -->
            </li>

            <li class="nav-item navbar-dropdown dropdown-user dropdown">
                <a class="nav-link dropdown-toggle hide-arrow" data-bs-toggle="dropdown" onclick="get_notifications_by_click()">
                    <i class="bx bx-bell me-2"></i>
                </a>
                <ul class="dropdown-menu dropdown-menu-end" id="header-messages-list" style="overflow-y: scroll; height: 150px;">
                    <li>
                        <a class="dropdown-item" href="#">
                            <i class='bx bx-bell'></i> 
                            <span class="align-middle">Sin Notificaciones</span>
                        </a>
                    </li>
                </ul>
            </li>

            <!-- User -->
            <li class="nav-item navbar-dropdown dropdown-user dropdown">
                <a class="nav-link dropdown-toggle hide-arrow" href="javascript:void(0);" data-bs-toggle="dropdown">
                    <div class="avatar avatar-online">
                        <img src="../assets/img/avatars/user.png" alt class="w-px-40 h-auto rounded-circle" />
                    </div>
                </a>
                <ul class="dropdown-menu dropdown-menu-end">
                    <li>
                        <a class="dropdown-item" href="#">
                            <div class="d-flex">
                                <div class="flex-shrink-0 me-3">
                                    <div class="avatar avatar-online">
                                        <img src="../assets/img/avatars/user.png" alt class="w-px-40 h-auto rounded-circle" />
                                    </div>
                                </div>
                                <div class="flex-grow-1">
                                    <span class="fw-semibold d-block" id="header-nombre-usuario"></span>
                                </div>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a class="dropdown-item" href="<?= $BASE_URL_FRONT . "me" ?>">
                            <i class="bx bx-user me-2"></i>
                            <span class="align-middle">Perfil</span>
                        </a>
                    </li>
                    <li>
                        <a class="dropdown-item text-danger" href="<?=$BASE_URL_FRONT?>logout">
                            <i class="bx bx-x me-2"></i>
                            <span class="align-middle">Salir</span>
                        </a>
                    </li>
                </ul>
            </li>
            <!--/ User -->
        </ul>
    </div>
</nav>