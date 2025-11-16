const filter_rows = (search_term, tbody_id) => {
    const tbody = document.getElementById(tbody_id);
    const rows = tbody.getElementsByTagName('tr');
    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const cells = row.getElementsByTagName('td');
        let shouldHide = true;
        for (let j = 0; j < cells.length; j++) {
            const cell = cells[j];
            if (cell.textContent.toLowerCase().includes(search_term.toLowerCase())) {
                shouldHide = false;
                break;
            }
        }
        
        if (shouldHide) {
            row.style.display = 'none';
        } else {
            row.style.display = '';
        }
    }
}



const buttons_request = (id, status, oferta_id) => {
    let buttons = status <= 4 && status >= 2 ? `<button type="button" title="Chat" onclick="get_messages_by_request('${ btoa(id) }')" data-bs-toggle="offcanvas" data-bs-target="#offcanvasChat" aria-controls="offcanvasBoth" class="btn btn-icon btn-sm btn-secondary mx-1">
                                    <span class="fas fa-message"></span>
                                </button>` : ``;
    switch (status) {
        case 1:
            buttons += ` <button type="button" title="Propuestas" onclick="get_proposal_by_request('${btoa(id)}')" class="btn btn-icon btn-sm btn-secondary mx-1">
                            <span class="fas fa-users"></span>
                        </button>`;
            break;
        case 2:
            buttons += ` <button type="button" title="Ver avances de solicitud" onclick="get_advances_by_request('${btoa(id)}')" class="btn btn-icon btn-sm btn-secondary mx-1">
                            <span class="fas fa-list-check"></span>
                        </button>`;
            break;
        case 3:
            // TODO
            buttons += ` <button type="button" title="Agregar Evidencia" onclick="add_advances_by_request_petioner('${btoa(id)}', '${btoa(oferta_id)}')" class="btn btn-icon btn-sm btn-secondary mx-1">
                            <span class="fas fa-file"></span>
                        </button>`;
            break;
        case 4:
        case 5:
            buttons += ` <button type="button" title="Agregar puntuación" onclick="points_request('${btoa(id)}')" class="btn btn-icon btn-sm btn-secondary mx-1">
                            <span class="fas fa-star"></span>
                        </button>`;
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

const span_status = (status) => {
    
    let span = '';
    switch (status) {
        case 1:
            span = `<span class='badge bg-label-primary me-1' >Publicada</span>`;
            break;
        case 2:
            span = `<span class='badge bg-label-secondary me-1' >En proceso</span>`;
            break;
        case 3:
            span = `<span class='badge bg-label-info me-1' >Verificado por solicitante</span>`;
            break;
        case 4:
            span = `<span class='badge bg-label-info me-1' >Verificado por voluntario</span>`;
            break;
        case 5:
            span = `<span class='badge bg-label-warning me-1' >Puntuacion pendiente</span>`;
            break;
        case 6:            
            span = `<span class='badge bg-label-info me-1' style='opacity: 0.5'>Finalizado</span>`;
            break;
    
        default:
            break;
    }
    return span;
}

const status_name = (status) => {
    
    let span = '';
    switch (status) {
        case 1:
            span = `Publicada`;
            break;
        case 2:
            span = `En proceso`;
            break;
        case 3:
            span = `Verificado por solicitante`;
            break;
        case 4:
            span = `Verificado por voluntario`;
            break;
        case 5:
            span = `Puntuacion pendiente`;
            break;
        case 6:            
            span = `Finalizado`;
            break;
    
        default:
            break;
    }
    return span;
}

// * REQUESTS TO NODE SERVER 
const process_requests = (data) => {
    // console.log(data);
    
    try {
        const div_container = document.getElementById('tbody-content-requests-my');
        let html = data.map( (request) =>  {
            const { titulo, archivos }                      = request;
            const { ofertas }                               = request;
            const {  id, estado, usuario_voluntario_id }    = request;
            let { fecha_registro }                          = request;
            fecha_registro                                  = new Date(fecha_registro).toLocaleDateString();

            const oferta_voluntario_actual  = ofertas.filter( ( oferta ) => oferta.usuario_voluntario_id == usuario_voluntario_id && oferta.aceptado == '1' )[0];
            const { id: oferta_id }         = oferta_voluntario_actual;

            const span_status_rq            = span_status(estado); 
            const status_name_1             = status_name(estado); 
            const buttons                   = buttons_request(id, estado, oferta_id); 

            return `<tr data-searchterm="${titulo} ${fecha_registro} ${status_name_1}">
                        <td> <i class='fas fa-file text-primary'></i> ${titulo}</td>
                        <td>${fecha_registro}</td>
                        <td>${span_status_rq}</td>
                        <td class='py-0'>
                            <div class='d-flex align-content-center'>${buttons}</div>
                        </td>
                    </tr>`;

        }).join('');

        div_container.innerHTML = html;
        // return true;

    } catch (error) {
        console.error( { "Error" : error.message } );
        // return false;
    }
}

const get_requests_my = async () => {

    try {
        const url = `${BASE_URL_NODE_SERVER}solicitud/my`;
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

const delete_request_by_id = async (solicitud_id_encrypted) => {
    const solicitud_id  = atob(solicitud_id_encrypted);
    const {value: respuesta_swal } = await Swal.fire({
        icon: 'question',
        title: '¿Desea eliminar la solicitud?',
        text: 'Esta accion no se puede deshacer',
        showDenyButton: true,
        confirmButtonText: 'Si',
        denyButtonText: `No`,
    });

    if (!respuesta_swal) {
        return;
    }

    try {

        if (isNaN(solicitud_id) || solicitud_id <= 0) {
            throw new Error("Error backend " , "El id de la solicitud no es valido");
        }


        const url   = `${BASE_URL_NODE_SERVER}solicitud/${solicitud_id}`;
        const token = localStorage.getItem('token');
        const res   = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });
    
        const response = await res.json();
        const { error, message } = response;

        if (error) {
            throw new Error("Error backend " , message);
        }
        
        Swal.fire({
            icon: 'success',
            title: message,    
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
        });

        get_requests_my();
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

const points_request = (solicitud_id_encrypted) => {
    const solicitud_id  = atob(solicitud_id_encrypted);
    // console.log( { solicitud_id_encrypted, solicitud_id } );
    
    document.querySelector('#form-points #solicitud_id').value = solicitud_id;
    $("#modal-add-points").modal("show");
}




document.addEventListener('DOMContentLoaded', async () => {
    await get_requests_my();

    $("#modal-add-points").on("hidden.bs.modal", function () {
        document.querySelector('#form-points textarea[name="comentario_voluntario"]').value     = '';
        document.querySelector('#form-points input[name="calificacion_voluntario"]').value   = '0';
        document.querySelector('#form-points #solicitud_id').value                              = '0';
    });

});
