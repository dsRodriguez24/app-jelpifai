const process_requests = (data) => {
    const div_container = document.getElementById('content-requests-available');
    try {
        let html = data.map( (request) =>  {
            const { titulo, descripcion, archivos, id } = request;
            const { solicitante, metodo_remuneracion } = request;
            const { nombre, apellido } = solicitante;
            const {  } = request;


            const descripcion_limit_caracters = descripcion.length > 100 ? `${descripcion.substring(0,100)}...` : descripcion;

            let url_archivo = '';
            try {
                let archivo_1   = archivos[0];
                url_archivo     = `${BASE_URL_SUPABASE_FILES}${archivo_1.nombre_archivo}`;
                // url_archivo = `${BASE_URL_NODE_SERVER}uploads/${archivo_1.nombre_archivo}`;
            } catch (error) {
                url_archivo = `${BASE_URL_FRONT}assets/img/elements/placeholder.png`;
            }

            return `<div class="col-md-3 col-lg-4 col-12 col-xs-12 mb-3">
                        <div class="card h-100">
                            <img class="card-img-top" src="${url_archivo}" alt="Imagen">
                            <div class="card-body">
                                <h5 class="card-title">${titulo}</h5>
                                <h6 class="card-subtitle mb-2 text-muted">${nombre} ${apellido}</h6>
                                <h6 class="card-subtitle mb-2 text-muted"><b>Remuneracion:</b> ${metodo_remuneracion == '1' ? 'Puntos' : 'Favor'}</h6>
                                <p class="card-text">${descripcion_limit_caracters}</p>
                                <a class="btn btn-primary text-white" onclick="get_request_by_id('${btoa(id)}')"> <i class="fas fa-eye"></i> Ver</a>
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

const get_requests_available = async () => {

    try {
        const url = `${BASE_URL_NODE_SERVER}solicitud/disponibles`;
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
        
        process_requests(data);
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

        background_blur_without_swal();
        console.error( { error : error.message } );
        return;
        
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    await get_requests_available();
});
