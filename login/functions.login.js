const login = async () =>{

    try {
        const form       = document.getElementById("form-authentication");
        const form_data  = new FormData(form);
        const url        = `${BASE_URL_NODE_SERVER}login`;
    
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(Object.fromEntries(form_data)),
        });
        
        const response = await res.json();
        feedback_login(response);

        const { error, data } = response;
        if (error) {
            console.error( { error } );
            return;
        }

        start_session(data.token);

    } catch (error) {
        console.error(error.message);
        const response = {
            error: "Ocurrio un error",
            data: null,
            message: "Ocurrio un error",
        }
        feedback_login(response);
    }
}

const feedback_login =  ( response ) =>{
    const { error, data, message } = response;
    Swal.fire({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        icon: error ? "error" : "success",
        title: message,
    });
}

const start_session = (token) => {
    setTimeout(() => {
        localStorage.setItem("token", token);
        const url = `${BASE_URL_FRONT}dashboard`;
        window.location.href = url;
    }, 2000);
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#form-authentication").addEventListener("submit", (e) => {
        e.preventDefault();
        login();
    });
})