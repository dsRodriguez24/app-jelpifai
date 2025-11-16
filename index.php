<?php 
  require_once __DIR__ ."/login/header.php";
?>
<div class="container-xxl">
  <div class="authentication-wrapper authentication-basic container-p-y">
    <div class="authentication-inner">
      <!-- Register -->
      <div class="card">
        <div class="card-body">
          <!-- Logo -->
          <div class="app-brand justify-content-center">
            <a href="index.html" class="app-brand-link gap-2">
              <img src="img/logo.png" style="max-height: 12vh ;">
            </a>
          </div>
          <!-- /Logo -->
          <h4 class="mb-2 text-center">Bienvenido a Jelpifay! 👋</h4>
          <p class="mb-4 text-center">Inicia sesion para ingresar</p>

          <form id="form-authentication" class="mb-3">
            <div class="mb-3">
              <label for="email" class="form-label">Usuario</label>
              <input type="text" required class="form-control" id="email" name="email" placeholder="Ingresa tu correo o usuario" autofocus/>
            </div>
            <div class="mb-3 form-password-toggle">
              <div class="d-flex justify-content-between">
                <label class="form-label" for="password">Contraseña</label>
                <!-- <a href="auth-forgot-password-basic.html">
                  <small>Forgot Password?</small>
                </a> -->
              </div>
              <div class="input-group input-group-merge">
                <input type="password" required id="contrasena" class="form-control" name="contrasena" placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;" aria-describedby="password"/>
                <span class="input-group-text cursor-pointer"><i class="bx bx-hide"></i></span>
              </div>
            </div>
            <div class="mb-3">
              <button class="btn btn-primary d-grid w-100" type="submit">Iniciar sesion</button>
            </div>
          </form>

          <p class="text-center">
            <span>¿No tienes cuenta?</span>
            <!-- <a href="register.html"> -->
            <a href="register">
              <span>Registrate</span>
            </a>
          </p>
          <p class="text-center">
            <a href="forgot_password">
              <span>¿Olvidaste tu contraseña?</span>
            </a>
          </p>
        </div>
      </div>
      <!-- /Register -->
    </div>
  </div>
</div>
<?php 
  require_once __DIR__ ."/login/footer.php";
?>