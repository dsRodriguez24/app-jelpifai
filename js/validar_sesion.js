let USER_ME = {};


const validar_session = async (token) => {
    try {
        const url = `${BASE_URL_NODE_SERVER}me`;
        const res = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });
    
        const response = await res.json();
        const { error, data } = response;
        // console.log( { data } );
        
    
        if (error) {
            localStorage.removeItem("token");
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Sesion expirada. Vuelve a iniciar sesion.',
                showConfirmButton: true
            });
            
            background_blur_without_swal();
            
            setTimeout(() => {
                window.location.href = `${BASE_URL_FRONT}`;
            }, 3000);
            
            return;
        } 
        
        USER_ME = data;
        return USER_ME;
        
    } catch (error) {
        
        localStorage.removeItem("token");
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Sesion expirada. Vuelve a iniciar sesion.',
            showConfirmButton: true
        });
        
        background_blur_without_swal();
        
        setTimeout(() => {
            window.location.href = `${BASE_URL_FRONT}`;
        }, 3000);
        
    }
}

const agregar_datos_header = () => {
    const header_nombre_usuario         = document.getElementById("header-nombre-usuario");
    header_nombre_usuario.textContent   = `${USER_ME.nombre} ${USER_ME.apellido}` ;
    
    const header_total_points           = document.getElementById("header-total-points");
    header_total_points.innerHTML       = `<i class='fas fa-star'></i> ${USER_ME.puntos.puntos_disponibles}` ;
}

document.addEventListener("DOMContentLoaded", async () => {
    const token = localStorage.getItem("token");
    if (!token) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No has inciado sesion. Redireccionando...',
            showConfirmButton: true,
        });

        background_blur_without_swal();
        
        setTimeout(() => {
            window.location.href = `${BASE_URL_FRONT}`;
        }, 3000);
    }
    await validar_session(token);

    agregar_datos_header();
});