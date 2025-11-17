function formatPais (pais) {
    if (!pais.id) return pais.text; // Si es el placeholder
    const flag = $(pais.element).data('flag');
    return $(
    `<span><img src="${flag}" class="img-flag" style="width:20px; margin-right:6px;"/> ${pais.text}</span>`
    );
}


const check_show_password_fields = document.getElementById('check-show-password-fields');
check_show_password_fields.addEventListener('change', function() {    
    const passwordFields = document.getElementById('password-fields');
    const fields = document.querySelectorAll('#password-fields input');

    if (this.checked) {
        passwordFields.style.display = 'block';
        fields.forEach(field => field.setAttribute('required', 'required'));
    } else {
        passwordFields.style.display = 'none';
        fields.forEach(field => field.removeAttribute('required'));
    }
});

const handler_veryfy_password = () => {
    const contrasena_antigua    = document.querySelector("#password-fields #contrasena_antigua").value;
    const contrasena            = document.querySelector("#password-fields #contrasena").value;
    const contrasena_confirm    = document.querySelector("#password-fields #contrasena_confirm").value;

    if (!contrasena_antigua || !contrasena || !contrasena_confirm) {
        Swal.fire({
            icon: 'warning',
            title: 'Por favor completa todos los campos de contraseña',
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
        return false;
    }
    
    if (contrasena !== contrasena_confirm) {
        Swal.fire({
            icon: 'warning',
            title: 'Las contraseñas no coinciden',
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
        return false;
    }

    return true;
}

const block_button_submit = (state) => {
    const button_submit     = document.querySelector("#form-update-user button[type='submit']");
    if (state) {
        button_submit.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Guardando...`;
    } else {
        button_submit.innerHTML = ` <i class="tf-icons bx bx-save"></i> Guardar`;
    }
    
    button_submit.disabled  = state;
}


const handler_submit_form = async () => {
    try {

        block_button_submit(true);
        
        const check_password = document.getElementById('check-show-password-fields');
        // console.log("Check " , check_password.checked);
        
        if (check_password.checked ) {
            const password_valid = handler_veryfy_password();
            if (!password_valid) {
                block_button_submit(false);
                return;
            }
        }

        const form      = document.getElementById("form-update-user");
        const formData  = new FormData(form);
        formData.append('change_password', check_password.checked ? '1' : '0');

        const url       = `${BASE_URL_NODE_SERVER}me`;
        const token     = localStorage.getItem('token');
        const res       = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(Object.fromEntries(formData))
        });
    
        const response = await res.json();
        // console.log("response " , response);
        
        block_button_submit(false);
        const { error, message } = response;        

        if (error) {
            throw new Error( error);
        }

        Swal.fire({
            icon: 'success',
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
        
    } catch (error) {
        block_button_submit(false);
        
        console.error(error);
        
        Swal.fire({
            icon: 'error',
            title: error.message,
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

};

document.addEventListener("DOMContentLoaded", () => {
    $('#indicativo_pais_id').select2({
        templateResult: formatPais,
        templateSelection: formatPais,
        minimumResultsForSearch: Infinity, // opcional: oculta el buscador
        height: 100
    });

    document.getElementById('form-update-user').addEventListener('submit', async (event) => {
        event.preventDefault();
        await handler_submit_form();
    });

    try {
        setTimeout(() => {
            const fields_load_data = [ 'nombre', 'apellido', 'email', 'indicativo_pais_id', 'telefono']
            fields_load_data.forEach(key => {
                const field = document.querySelector(`#form-update-user [name='${key}']`);
                if (USER_ME[key]) {
                    field.value = USER_ME[key];
                }
            });
        }, 1500);
        
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Lo sentimos...',
            text: 'Ocurrio un error al cargar datos de usuario.',
            showConfirmButton: true
        });
        
        background_blur_without_swal();
        console.warn("Error al cargar datos" , error.message);
        
    }

})