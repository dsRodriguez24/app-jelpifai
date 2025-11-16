<?php
date_default_timezone_set('America/Bogota');
require_once __DIR__ . "/login/header.php";

$iu = base64_decode(base64_decode($_GET["iu"]));
$xd = base64_decode(base64_decode($_GET["xd"]));

$fecha_hora_vencimiento = date("Y-m-d H:i:s", strtotime($xd) );
$fecha_hora_actual      = date("Y-m-d H:i:s");

$is_valid = '1';
if ( strtotime( $fecha_hora_actual ) > strtotime( $fecha_hora_vencimiento ) ) {
    $is_valid = '0';
}
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
          <h4 class="mb-2">Restaura tu contraseña 🔒</h4>
          <p class="mb-4">Ingresa una contraseña y confirmala</p>
          <form id="change-password" class="mb-3"  method="POST">
            <div class="mb-3">
              <label for="email" class="form-label">Contraseña Nueva</label>
              <input type="password" class="form-control" id="contrasena" required name="contrasena" placeholder="" autofocus />
            </div>
            <div class="mb-3">
              <label for="email" class="form-label">Confirmacion de Contraseña Nueva</label>
              <input type="password" class="form-control" id="contrasena_confirm" required name="contrasena_confirm" placeholder="" />
            </div>
            <input type="hidden" name="user_id_encrypted" value="<?= $_GET['iu'] ?>" />
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
    
    const date_valid = '<?= $is_valid ?>';    
    if (date_valid != '1') {
      Swal.fire({
        icon: 'error',
        title: 'Enlace Expirado',
        text: 'El enlace para restaurar la contraseña ha expirado. Por favor, solicita un nuevo enlace de recuperación.',
        confirmButtonText: 'OK'
      }).then(() => {
        window.location.href = `${BASE_URL_FRONT}forgot_password`;
      });
      return;
    }
    
    
    const formForgotPassword = document.getElementById('change-password')
    formForgotPassword.addEventListener('submit', async ( e )=> {
      e.preventDefault();

      const user_id_encrypted   =  document.querySelector("#change-password input[name='user_id_encrypted']").value;
      const contrasena          =  document.querySelector("#change-password input[name='contrasena']").value;
      const contrasena_confirm  =  document.querySelector("#change-password input[name='contrasena_confirm']").value;

      if (!contrasena || !contrasena_confirm) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Por favor, completa todos los campos.',
          confirmButtonText: 'OK'
        });
        return;
      }
      
      if (contrasena != contrasena_confirm) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Las contraseñas no coinciden.',
          confirmButtonText: 'OK'
        });
        return;
      }


      const data_send = {
        user_id_encrypted,
        contrasena
      };

      const resp      = await fetch(`${BASE_URL_NODE_SERVER}login/cambiar_contrasena`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data_send)
      })

      const response                  = await resp.json();
      // console.log(response);
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
        window.location.href = `${BASE_URL_FRONT}`;
      });
    })
  })
</script>


<?php
require_once __DIR__ . "/login/footer.php";
?>