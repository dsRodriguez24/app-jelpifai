const register = async () =>{

    try {
        const contrasena            = document.getElementById("contrasena").value;
        const confirm_contrasena    = document.getElementById("confirm_contrasena").value;
        const telefono              = document.getElementById("telefono").value;

        if( contrasena.length < 5 ){
            feedback_register({ error: true, message: "La contraseña debe tener al menos 5 caracteres" });
            return;
        }
        
        if( contrasena  != confirm_contrasena ){
            feedback_register({ error: true, message: "Las contraseñas no coinciden" });
            return;
        }
        
        if( telefono.length < 8 ){
            feedback_register({ error: true, message: "El telefono debe tener al menos 8 digitos" });
            return;
        }

        const form       = document.getElementById("form-authentication");
        const form_data  = new FormData(form);
        const url        = `${BASE_URL_NODE_SERVER}usuario`;
    
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(Object.fromEntries(form_data)),
        });
        
        const response = await res.json();
        feedback_register(response);

        const { error } = response;
        if (error) {
            console.error( { error } );
            return;
        }

        start_session();

    } catch (error) {
        console.error(error.message);
        const response = {
            error: error.message,
            data: null,
            message: "Ocurrio un error",
        }
        feedback_register(response);
    }
}

const feedback_register =  ( response ) =>{
    const { error, message } = response;
    Swal.fire({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        icon: error ? "error" : "success",
        title: message,
    });
}

const start_session = () => {
    setTimeout(() => {
        const url = `${BASE_URL_FRONT}`;
        window.location.href = url;
    }, 3500);
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#form-authentication").addEventListener("submit", (e) => {
        e.preventDefault();
        register();
    });
})