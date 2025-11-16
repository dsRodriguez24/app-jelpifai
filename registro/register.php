<?php
require_once __DIR__ . "/header.php";
?>
<!-- Content -->
<div class="container-xxl">
  <div class="authentication-wrapper authentication-basic container-p-y">
    <div class="authentication-inner">
      <!-- Register Card -->
      <div class="card">
        <div class="card-body">
          <!-- Logo -->
          <div class="app-brand justify-content-center mb-3">
            <a href="/" class="app-brand-link gap-2">
              <img src="img/logo.png" style="max-height: 12vh ;">
            </a>
          </div>
          <!-- /Logo -->
          <h4 class="mb-2 text-center">Registrate</h4>
          <p class="mb-4 text-center">Y empieza a ayudar a tu comunidad</p>
          <form id="form-authentication" class="mb-3 row">
            <div class="mb-3">
              <label for="username" class="form-label">Correo Electrónico</label>
              <input type="email" class="form-control" id="email" required name="email" placeholder="Ingresa tu correo electrónico" autofocus />
            </div>
            <div class="mb-3">
              <label for="email" class="form-label">Nombres</label>
              <input type="text" class="form-control" id="nombre" required name="nombre" placeholder="Ingresa tus nombres" />
            </div>
            <div class="mb-3">
              <label for="email" class="form-label">Apellidos</label>
              <input type="text" class="form-control" id="apellido" required name="apellido" placeholder="Ingresa tus apellidos" />
            </div>
            <div class="mb-3 col-md-4">
              <label for="indicativo_pais_id" class="form-label">Indicativo</label>
              <!-- <input type="text" class="form-control select2" id="indicativo_pais_id" required name="indicativo_pais_id" placeholder="Ingresa tus apellidos" /> -->
              <select id="indicativo_pais_id" name="indicativo_pais_id" class="form-control select2" style="max-width: 100%; width: 100%;">
                <option value="1" data-flag="https://flagcdn.com/w20/co.png">+57</option>
                <option value="3" data-flag="https://flagcdn.com/w20/us.png">+1</option>
              </select>
            </div>
            <div class="mb-3 col-md-8">
              <label for="email" class="form-label">Telefono</label>
              <input type="text" class="form-control" id="telefono" required name="telefono" placeholder="Ingresa tu numero de telefono" />
            </div>
            <div class="mb-3 form-password-toggle">
              <label class="form-label" for="contrasena">Contraseña</label>
              <div class="input-group input-group-merge">
                <input type="password" id="contrasena" class="form-control" required name="contrasena" placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;" aria-describedby="password" />
                <span class="input-group-text cursor-pointer"><i class="bx bx-hide"></i></span>
              </div>
            </div>
            <div class="mb-3 form-password-toggle">
              <label class="form-label" for="confirm_contrasena">Confirmar contraseña</label>
              <div class="input-group input-group-merge">
                <input type="password" id="confirm_contrasena" class="form-control" required name="confirm_contrasena" placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;" aria-describedby="password" />
                <span class="input-group-text cursor-pointer"><i class="bx bx-hide"></i></span>
              </div>
            </div>
            <button class="btn btn-primary d-grid w-100">Regístrate!</button>
          </form>
          <p class="text-center">
            <span>¿Ya tienes una cuenta?</span>
            <a href="<?=$BASE_URL_FRONT?>">
              <span>Inicia Sesión</span>
            </a>
          </p>
        </div>
      </div>
      <!-- Register Card -->
    </div>
  </div>
</div>

<?php
require_once __DIR__ . "/footer.php";
?>

<link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>

<script>
  function formatPais (pais) {
    if (!pais.id) return pais.text; // Si es el placeholder
    const flag = $(pais.element).data('flag');
    return $(
      `<span><img src="${flag}" class="img-flag" style="width:20px; margin-right:6px;"/> ${pais.text}</span>`
    );
  }

  document.addEventListener("DOMContentLoaded", () => {
    // Inicialización de Select2
    $('#indicativo_pais_id').select2({
      templateResult: formatPais,
      templateSelection: formatPais,
      minimumResultsForSearch: Infinity // opcional: oculta el buscador
    });
  })
</script>

<style>
  .select2-container--default .select2-selection--single {
  height: calc(2.375rem + 2px); /* igual que Bootstrap .form-control */
  border: 1px solid #ced4da;
  border-radius: 0.375rem;
  display: flex;
  align-items: center;
}

.select2-selection__rendered {
  line-height: normal !important;
  display: flex;
  align-items: center;
}

.select2-selection__arrow {
  height: 100% !important;
}

</style>