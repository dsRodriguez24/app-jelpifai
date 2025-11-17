const handler_redeem_product = async (id) => {
    if (isNaN(id)) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Existe un error con el codigo de producto',
        });
        return;
    }
    
    try {
        const url        = `${BASE_URL_NODE_SERVER}producto_canjeado`; 
        const token      = localStorage.getItem('token');
        const data_send  = {
            producto_id: id
        }
        
        const res   = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(data_send)
        });
    
        const response                  = await res.json();
        //  console.log("Response " , response);
        
        const { error, data, message }  = response;    
        if (error) {
            throw new Error("Error backend " , error);
        }
        
        Swal.fire({
            icon: 'success',
            title: 'Correcto',
            text: message,
            confirmButtonText: 'OK'
        }).then((result) => {
            window.location.reload();
        });
        
        return;
        
    } catch (error) {
        
        Swal.fire({
            icon: 'error',
            title: 'Lo sentimos, ocurrio un error',
            text: error.message,
            confirmButtonText: 'OK'
        });


    }
}

const redeem_product = async (id, puntos_requeridos) => {
    id                  = atob(id); 
    puntos_requeridos   = atob(puntos_requeridos);
    puntos_requeridos   = isNaN(puntos_requeridos) ? 0 : parseInt(puntos_requeridos);


    const puntos_disponibles = USER_ME.puntos.puntos_disponibles;
    if (puntos_requeridos > puntos_disponibles) {
        const puntos_necesarios = puntos_requeridos - puntos_disponibles;
        const { value: confirm_redeem } = await Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `No tienes suficientes puntos para canjear este producto. Necesitas ${puntos_necesarios} puntos más.`,
            showConfirmButton: true
        });

        return;
    }


    const { value: confirm_redeem } = await Swal.fire({
        icon: 'question',
        title: 'Confirmar',
        text: `¿Desea canjear ${puntos_requeridos} puntos por este producto?. Recuerde que esta accion no se puede deshacer`,
        showDenyButton: true,
        confirmButtonText: 'Si',
        denyButtonText: `No`,
    });

    if (!confirm_redeem) {
        return;
    }

    await handler_redeem_product(id);
}

const process_products = (data) => {
    const div_container = document.getElementById('content-products-available');
    try {
        let html = data.map( (request) =>  {
            const { nombre, puntos_requeridos, id } = request;
            let url_archivo = `${BASE_URL_FRONT}assets/img/elements/placeholder-image-jelpifai.png`;

            return `<div class="col-md-3 col-lg-4 col-12 col-xs-12 mb-3">
                        <div class="card h-100">
                            <img class="card-img-top" src="${url_archivo}" alt="Imagen">
                            <div class="card-body">
                                <h5 class="card-title">${nombre}</h5>
                                <p class="card-text">${puntos_requeridos} puntos</p>
                                <button class="btn btn-primary text-white btn-redeem-producto" onclick="redeem_product('${btoa(id)}', '${btoa(puntos_requeridos)}')"> <i class="fas fa-credit-card"></i> Canjear </bu>
                            </div>
                        </div>
                    </div>`;
        }).join('');

        div_container.innerHTML = html;
        return true;

    } catch (error) {
        console.error( { "Error" : error.message } );
        return false;
    }
}

const get_products = async () => {

    try {
        const url = `${BASE_URL_NODE_SERVER}producto`;
        const token = localStorage.getItem('token');
        const res = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });
    
        const response = await res.json();
        const { error, data } = response;        

        if (error) {
            throw new Error("Error backend " , error);
        }
        
        process_products(data);
        
        const buttons_canjeo = document.querySelectorAll(".btn-redeem-producto");
        buttons_canjeo.forEach( (button) => {
            button.disabled = true;
        });

        return;
        
    } catch (error) {
        
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Lo sentimos, ocurrio un error',
            showConfirmButton: false,
            allowOutsideClick: false,
            allowEscapeKey: false,   
            allowEnterKey: false,    

        });

        console.error( { error : error.message } );
        return;
        
    }
}


document.addEventListener('DOMContentLoaded', async () => {
    await get_products();

    const buttons_canjeo = document.querySelectorAll(".btn-redeem-producto");
    
    setInterval(() => {
        buttons_canjeo.forEach( (button) => {
            const puntos_disponibles = USER_ME.puntos.puntos_disponibles;
            button.disabled = isNaN(puntos_disponibles) ? true : false;
        });
        
    }, 1000);
});
