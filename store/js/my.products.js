const process_my_products = (data) => {
    const div_container = document.getElementById('content-products-available');
    try {
        let html = data.map( (p) =>  {
            const { producto, fecha_registro, puntos_canjeados } = p;
            let fecha_adquisicion = new Date(fecha_registro).toLocaleDateString('es-ES');
            let url_archivo = `${BASE_URL_FRONT}assets/img/elements/placeholder-image-jelpifai.png`;

            return `<div class="col-md-3 col-lg-4 col-12 col-xs-12 mb-3">
                        <div class="card h-100">
                            <img class="card-img-top" src="${url_archivo}" alt="Imagen">
                            <div class="card-body">
                                <h5 class="card-title">${producto.nombre}</h5>
                                <p class="card-text mb-1">${puntos_canjeados} puntos canjeados</p>
                                <p class="text-muted mb-1"><b> Fecha de canjeo:</b> ${fecha_adquisicion}</p>
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

const get_my_products = async () => {

    try {
        const url = `${BASE_URL_NODE_SERVER}producto_canjeado/mi`;
        const token = localStorage.getItem('token');
        const res = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });
    
        const response = await res.json();
        // console.log(response);
        const { error, data } = response;        

        if (error) {
            throw new Error("Error backend " , error);
        }
        
        process_my_products(data);
        
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
    await get_my_products();
});
