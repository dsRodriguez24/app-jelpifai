const get_request_by_id = async (id_encoded) => {

    try {
        const id_decoded = atob(id_encoded);
        const url = `${BASE_URL_NODE_SERVER}solicitud/${id_decoded}`;
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
        
        show_detail_request(data);

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


const show_detail_request = (request) => {
    let { archivos, solicitante, prioridad_solicitud }          = request;
    let { fecha_registro, descripcion, metodo_remuneracion_id } = request;
    let { nombre, apellido }                                    = solicitante;
    
    let carrousel_items = '';
    let carrousel_buttons = '';

    
    const btn_take_request      = document.querySelector('#modal-detail-request #btn-modal-take-request');
    const modal_title           = document.querySelector('#modal-detail-request #modalCenterTitle');
    const detail_request        = document.querySelector('#modal-detail-request #detail-request');
    const carousel_indicators   = document.querySelector('#carouselDetailRequest .carousel-indicators');
    const carousel_inner        = document.querySelector('#carouselDetailRequest .carousel-inner');

    let files_exists = true;
    if (archivos.length == 0) {
        files_exists = false;
        archivos = [{nombre_archivo: 'placeholder.png'}];
    }

    if (archivos.length > 0) {
        
        carrousel_buttons = archivos.map( (archivo, index) => {
            return `<button type="button" data-bs-target="#carouselDetailRequest" data-bs-slide-to="${index}" class="${index === 0 ? 'active' : ''}" aria-label="Slide ${index+1}"></button>`;
        }).join('');

        carrousel_items = archivos.map( (archivo, index) => {
            const url_archivo = files_exists ? `${BASE_URL_SUPABASE_FILES}${archivo.nombre_archivo}` : `${BASE_URL_FRONT}assets/img/elements/placeholder.png`;
            // const url_archivo = files_exists ? `${BASE_URL_NODE_SERVER}uploads/${archivo.nombre_archivo}` : `${BASE_URL_FRONT}assets/img/elements/placeholder.png`;

            return `<div class="carousel-item ${index === 0 ? 'active' : ''}">
                        <img class="d-block w-100 image-carrousel" src="${url_archivo}">
                        <div class="carousel-caption d-none d-md-block">
                            <h3></h3>
                            <p></p>
                        </div>
                    </div>`;
        }).join('');

    }
    
    carousel_indicators.innerHTML   = carrousel_buttons;
    carousel_inner.innerHTML        = carrousel_items;

    modal_title.innerHTML          = request.titulo;

    const nombre_urgencia = {
        1 : 'Urgente',
        2 : 'Proximas 24 horas',
        3 : 'Esta semana'
    }

    let detalle_solicitud   = '';
    detalle_solicitud       += fecha_registro ? `<h6> <i class="fas fa-calendar-day"></i> Fecha de publicacion: ${fecha_registro}</h6>` : '';
    detalle_solicitud       += nombre &&  apellido ? `<h6> <i class="fas fa-user"></i> Solicitante:  ${nombre} ${apellido}</h6>` : '';
    detalle_solicitud       += descripcion ? `<h6> <i class="fas fa-align-center"></i> Descripcion: ${descripcion}</h6>` : '';
    detalle_solicitud       += nombre_urgencia[prioridad_solicitud] ? `<h6> <i class="fas fa-exclamation"></i> Urgencia: ${nombre_urgencia[prioridad_solicitud]}</h6>` : '';
    detalle_solicitud       += metodo_remuneracion_id ? `<i class="fas fa-money-bill-transfer"></i> Remuneración: ${metodo_remuneracion_id == 1 ? 'Puntos' : 'Favor'}</h6>` : '';

    detail_request.innerHTML = detalle_solicitud;


    const tipo_solicitud = metodo_remuneracion_id == 1 ? 1 : 2;
    btn_take_request.onclick = async () => await take_request(request.id, tipo_solicitud);
    $("#modal-detail-request").modal("show");
}

const take_request = async (id, tipo) => {
    $(".modal").modal("hide");

    let favor = '';
    switch (tipo) {
        case 1:
            const { value: take } = await Swal.fire({
                icon: 'question',
                title: 'Confirmar',
                text: '¿Desea tomar la solicitud?. Algunos de tus datos seran visibles para el solicitante.',
                showDenyButton: true,
                confirmButtonText: 'Si',
                denyButtonText: `No`,
            });
            
            if (!take) {
                return;
            }

            break;
        case 2:
            const { value: take_2 } = await Swal.fire({
                icon: 'question',
                title: 'Confirmar',
                showDenyButton: true,
                html: ` <p> El método de remuneracion de esta solicitud es 'favor por favor'. A continuacion ingresa el 'favor' con el que deseas ser remunerado </p> 
                        <textarea id="swal-input1" class="form-control" placeholder="Favor"></textarea>`,
                confirmButtonText: 'Enviar solicitud',
                denyButtonText: `No`,
            });

            if (!take_2) {
                return;
            }

            favor = document.querySelector('#swal-input1').value;
            if (!favor) {
                Swal.fire('Favor no ingresado', '', 'info')
                return;
            }

            break;
    
        default:
            return;
            break;
    }


    await handler_send_proposal(id, favor);


}

const handler_send_proposal = async (id, favor) => {
    
    try {
        const url           = `${BASE_URL_NODE_SERVER}solicitud_oferta`;
        const token         = localStorage.getItem('token');

        const res   = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                solicitud_id: id,
                mensaje_oferta: favor,
            }),
        });
    
        const response          = await res.json();
        const { error, data, message }   = response;

        Swal.fire({
            icon: error ? 'error': 'success',
            title: message,
            toast : true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }    
        });


        if (error) {
            throw new Error("Error backend " , error);
        }
        

        return;
        
    } catch (error) {

        background_blur_without_swal();
        console.error( { error : error.message } );
        return;
        
    }


}