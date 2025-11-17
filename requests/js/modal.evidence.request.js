
// * FUNCTIONS TO PROCESS DATA AND HTML ELEMENTS
const buttons_request_accepted = (id, porpose_id ,status) => {
    let buttons = status >= 2 && status <= 4 ? `<button type="button" onclick="get_messages_by_request('${btoa(id)}')" title="Chat" data-bs-toggle="offcanvas" data-bs-target="#offcanvasChat" aria-controls="offcanvasBoth" class="btn btn-icon btn-sm btn-secondary mx-1">
                                    <span class="fas fa-message"></span>
                                </button>` : ``;
    switch (status) {
        case 2:
            buttons += ` <button type="button" title="Agregar avance de solicitud" onclick="add_advances_by_request('${btoa(id)}', '${btoa(porpose_id)}')" class="btn btn-icon btn-sm btn-secondary mx-1">
                            <span class="fas fa-list-check"></span>
                        </button>`;
            break;
        case 3:
            buttons += ` <button type="button" title="Ver avances de solicitante" onclick="get_advances_by_request_petioner('${btoa(id)}')" class="btn btn-icon btn-sm btn-secondary mx-1">
                            <span class="fas fa-list-check"></span>
                        </button>`;
            break;
        case 4:
            // TODO
            // buttons += ` <button type="button" title="Agregar puntuación" class="btn btn-icon btn-sm btn-secondary mx-1">
            //                 <span class="fas fa-star"></span>
            //             </button>`;
            break;
        case 5:
            buttons += ``;
            break;
    
        default:
            break;
    }

    // if (status <= 4) {
    if (status == 1) {
        buttons += `<button type="button" title="Editar" onclick="get_request_by_id('${btoa(id)}')" class="btn btn-icon btn-sm btn-primary mx-1">
                        <span class="fas fa-pen"></span>
                    </button>
                    <button type="button" title="Eliminar" onclick="delete_request_by_id('${btoa(id)}')" class="btn btn-icon btn-sm btn-danger mx-1" style='opacity: 0.7'>
                        <span class="fas fa-xmark"></span>
                    </button>`;
    }
    return buttons;

}

const add_advances_by_request = (id_request_encoded, id_porpose_encoded) => {
    const request_id = atob(id_request_encoded);
    const porpose_id = atob(id_porpose_encoded);

    const solicitud_id          = document.querySelector('#form-add-evidence input[name="solicitud_id"]');
    const solicitud_oferta_id   = document.querySelector('#form-add-evidence input[name="solicitud_oferta_id"]');
    
    solicitud_id.value          = request_id;
    solicitud_oferta_id.value   = porpose_id;


    $("#modal-add-evidence-request").modal("show");
}

const process_requests_accepted = (data) => {
    const div_container = document.getElementById('tbody-content-requests-accepted');
    
    // console.log( { div_container } );
    

    try {
        let html = data.map( (request) =>  {
            
            const { titulo }            = request;
            const {  id, estado }       = request;
            let { fecha_registro }      = request;
            fecha_registro              = new Date(fecha_registro).toLocaleDateString();

            const porpose_id            = request.ofertas[0].id;
            const span_status_rq        = span_status(estado); 
            const buttons               = buttons_request_accepted(id, porpose_id ,estado); 

            return `<tr>
                        <td> <i class='fas fa-file text-primary'></i> ${titulo}</td>
                        <td>${fecha_registro}</td>
                        <td>${span_status_rq}</td>
                        <td class='py-0'>
                            <div class='d-flex align-content-center'>${buttons}</div>
                        </td>
                    </tr>`;

        }).join('');
        

        div_container.innerHTML = html;
        return true;

    } catch (error) {
        console.error( { "Error" : error.message } );
        return false;
    }
}


// * ACTIONS API
const handler_save_evidence_request = async () => {
    try {
        const url   = `${BASE_URL_NODE_SERVER}solicitud_oferta_evidencia`;
        const token = localStorage.getItem('token');
        
        const form_data = new FormData( document.getElementById('form-add-evidence') );
        
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: form_data,
        });
    
        const response                      = await res.json();
        const { error, data, message }      = response;
        
        console.log( {response } );
        

        if (error) {
            throw new Error(`Error backend ${message}` , error);
        }
        
        Swal.fire({
            icon: 'success',
            title: message,
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
        });
        
        await get_requests_accepted();
        $('.modal').modal('hide');

        return;
        
    } catch (error) {
        
        console.error(error);
        

        Swal.fire({
            icon: 'error',
            title: error.message,
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
        });

        // background_blur_without_swal();
        console.error( { error : error.message } );
        return;
        
    }
}



const get_requests_accepted = async () => {

    try {
        const url = `${BASE_URL_NODE_SERVER}solicitud/accepted`;
        const token = localStorage.getItem('token');
        const res = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });
    
        const response = await res.json();
        console.log("Response " , response);
        
        const { error, data } = response;        

        if (error) {
            throw new Error("Error backend " , error);
        }
        
        process_requests_accepted(data);
        return;
        
    } catch (error) {
        
        console.warn( { error : error } );
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
    await get_requests_accepted();

    document.getElementById('form-add-evidence').addEventListener('submit', async (e) => {
        e.preventDefault();
        await handler_save_evidence_request();
    });

});