<?php
require_once __DIR__ . "/login/header.php";
?>


<div class="container-xxl">
  <div class="authentication-wrapper authentication-basic container-p-y">
    <div class="authentication-inner py-4">
      <!-- Forgot Password -->
      <div class="card">
        <div class="card-body">
          <!-- Logo -->
          <!-- Logo -->
          <div class="app-brand justify-content-center">
            <a href="<?= $BASE_URL_FRONT ?>" class="app-brand-link gap-2">
              <img src="img/logo.png" style="max-height: 12vh ;">
            </a>
          </div>
          <!-- /Logo -->
          <!-- /Logo -->
          <h4 class="mb-2">¿Olvidaste tu contraseña? 🔒</h4>
          <p class="mb-4">Ingresa tu email para validar tu identidad</p>
          <form id="form-forgot-password" class="mb-3">
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input type="text" class="form-control" id="email" required name="email" placeholder="Ingresa tu email" autofocus />
            </div>
            <button class="btn btn-primary d-grid w-100">Enviar instrucciones de recuperacion</button>
          </form>
          <div class="text-center">
            <a href="<?=$BASE_URL_FRONT?>" class="d-flex align-items-center justify-content-center">
              <i class="bx bx-chevron-left scaleX-n1-rtl bx-sm"></i>
              Volver a inicio de sesion
            </a>
          </div>
        </div>
      </div>
      <!-- /Forgot Password -->
    </div>
  </div>
</div>

<script>
  document.addEventListener("DOMContentLoaded", () => {
    const formForgotPassword = document.getElementById('form-forgot-password')
    formForgotPassword.addEventListener('submit', async ( e )=> {
      e.preventDefault();
      const formData  = new FormData(formForgotPassword);
      const data_send = Object.fromEntries(formData);
      const resp      = await fetch(`${BASE_URL_NODE_SERVER}login/recuperar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data_send)
      })

      const response                  = await resp.json();
      const { error, data, message }  = response;

      if( error ) {
        Swal.fire({
          icon: 'error',
          title: message,
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        });
        return;
      }
      
      Swal.fire({
        icon: 'success',
        title: 'Correcto',
        text: message,
        confirmButtonText: 'OK'
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = `${BASE_URL_FRONT}`;
        }
      });
    })
  })
</script>


<?php
require_once __DIR__ . "/login/footer.php";
?>