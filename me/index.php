<?php
require_once __DIR__ . "/../menu.php";
require_once __DIR__ . "/../header.php";
?>

<div class="content-wrapper">
    <!-- Content -->

    <div class="container-xxl flex-grow-1 container-p-y">
        <div class="row">
            <div class="col-md-12">
                <ul class="nav nav-pills flex-column flex-md-row mb-3">
                    <li class="nav-item">
                        <a class="nav-link active"><i class="bx bx-user me-1"></i> Informacion de perfil</a>
                    </li>
                </ul>
                <div class="card mb-4">

                    <hr class="my-0" />
                    <div class="card-body">
                        <form id="form-update-user" method="POST" autocomplete="off">
                            <div class="row">
                                <div class="mb-3 col-lg-6 col-12">
                                    <label for="nombre" class="form-label">Nombre</label>
                                    <input required class="form-control" type="text" id="nombre" name="nombre" autofocus  />
                                </div>
                                <div class="mb-3 col-lg-6 col-12">
                                    <label for="apellido" class="form-label">Apellido</label>
                                    <input required class="form-control" type="text" name="apellido" id="apellido" />
                                </div>
                                <div class="mb-3 col-12">
                                    <label for="email" class="form-label">E-mail</label>
                                    <input required class="form-control" type="email" name="email" id="email" />
                                </div>
                                <div class="mb-3 col-lg-4 col-3">
                                    <label for="indicativo_pais_id" class="form-label">Indicativo</label>
                                    <select id="indicativo_pais_id" name="indicativo_pais_id" class="form-control select2" style="max-width: 100%; width: 100%;">
                                        <option value="1" data-flag="https://flagcdn.com/w20/co.png">+57</option>
                                        <option value="3" data-flag="https://flagcdn.com/w20/us.png">+1</option>
                                    </select>
                                </div>
                                <div class="mb-3 col-lg-8 col-9">
                                    <label for="email" class="form-label">Telefono</label>
                                    <input type="text" class="form-control" id="telefono" required name="telefono" placeholder="Ingresa tu numero de telefono" />
                                </div>

                                <div class="col-12">
                                    <div class="form-check form-switch mb-2">
                                        <input class="form-check-input" type="checkbox" id="check-show-password-fields">
                                        <label class="form-check-label" for="check-show-password-fields">Modificar contraseña</label>
                                    </div>
                                </div>

                                <div class="col-12" style="display: none;" id="password-fields">
                                    <div class="col-12 row">
                                        <div class="col-lg-12 col-12">
                                            <label for="contrasena_antigua" class="form-label">Contraseña Antigua</label>
                                            <input type="password" autocomplete="off" class="form-control" name="contrasena_antigua" id="contrasena_antigua" />
                                        </div>
                                        <div class="col-lg-6 col-12">
                                            <label for="contrasena" class="form-label">Contraseña Nueva</label>
                                            <input type="password" autocomplete="off" class="form-control" name="contrasena" id="contrasena" />
                                        </div>
                                        <div class="col-lg-6 col-12">
                                            <label for="contrasena_confirm" class="form-label">Contraseña Nueva [Confirmación]</label>
                                            <input type="password" autocomplete="off" class="form-control" name="contrasena_confirm" id="contrasena_confirm" />
                                        </div>
                                    </div>
                                </div>


                            </div>
                            <div class="mt-2">
                                <button type="submit" class="btn btn-primary me-2"> <i class="tf-icons bx bx-save"></i> Guardar</button>
                            </div>
                        </form>
                    </div>
                    <!-- /Account -->
                </div>

            </div>
        </div>
    </div>
    <!-- / Content -->

</div>
<?php
require_once __DIR__ . "/../footer.php"
?>
<script src="<?= $BASE_URL_FRONT ?>me/js/index.js"></script>