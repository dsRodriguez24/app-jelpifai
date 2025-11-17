const get_advances_by_request = async (id_encrypted) => {
    try {

        const id    = atob(id_encrypted);
        const url   = `${BASE_URL_NODE_SERVER}solicitud_oferta_evidencia/solicitud/${id}`;
        const token = localStorage.getItem('token');
        const res   = await fetch(url, {
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
        
        add_advances_to_modal(data);

        return;
        
    } catch (error) {
        
        Swal.fire({
            icon: 'error',
            title: 'Error al obtener avances de solicitud',
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



const add_advances_to_modal = (data) => {

    let html = '<p>Aun no hay avances. Consulta en las proximas horas...</p>';
    const btn_aceptar_cerrar_advances = document.querySelector('#modal-advances-request #btn-aceptar-cerrar-advances');
    btn_aceptar_cerrar_advances.style.display = 'none';
    
    if (data.length > 0) {
        html = data.map( ( proposal, index ) =>  {

            let { fecha_registro, nombre_archivo }          =  proposal;
            let { usuario, mensaje, fecha_plazo_descarte }  =  proposal;
            let { evidencia_descartada }                    =  proposal;
            
            let strong_fecha_descarte   = ``;
            let button_descartar_avance = ``;
            if (evidencia_descartada == '0') {
                
                if(!fecha_plazo_descarte ){
                    // * SUMAR DOS DIAS A LA FECHA DE REGISTRO
                    fecha_plazo_descarte  = new Date(fecha_registro);
                    fecha_plazo_descarte.setDate( fecha_plazo_descarte.getDate() + 2 );
                    fecha_plazo_descarte  = fecha_plazo_descarte.toISOString();
                }

                strong_fecha_descarte   = `<strong style="color: #ff7961;"> <i class="fas fa-clock"></i> ${new Date(fecha_plazo_descarte).toLocaleDateString()}</strong>`;
                button_descartar_avance = `<a title="Descartar avance" onclick="discard_advance('${btoa(proposal.id)}')" class="btn btn-icon btn-sm  btn-danger text-white mx-1 my-1" style="opacity: 0.7"> <i class='fas fa-xmark'></i></a>`;
            }


            let nombre_voluntario   = usuario.nombre ? `${usuario.nombre}` : '';
            nombre_voluntario       += usuario.apellido ? ` ${usuario.apellido}` : '';

            let fecha__hora_registro    =  new Date(fecha_registro).toLocaleString();
            let url_archivo             = nombre_archivo ? `${BASE_URL_SUPABASE_FILES}${nombre_archivo}` : `#`;
            // let url_archivo             = nombre_archivo ? `${BASE_URL_NODE_SERVER}uploads/${nombre_archivo}` : `#`;

            return `<div class="col-12 d-flex justify-content-between">
                        <div>
                            <a class="me-1 collapsed" style="text-decoration: none" data-bs-toggle="collapse" href="#collapseAdvance${index}" role="button" aria-expanded="false" aria-controls="collapseAdvance${index}"> <i class='fas fa-people-arrows-left-right'></i> Av. #${index+1} | ${fecha__hora_registro} | ${nombre_voluntario}| ${strong_fecha_descarte} </a>
                        </div>
                        
                        <div class='d-flex align-content-center'>
                            ${button_descartar_avance}
                            <a title="Adjunto" href="${url_archivo}" target="_blank" download  class="btn btn-icon btn-sm btn-primary text-white mx-1 my-1"> <i class='fas fa-arrow-down'></i></a>
                        </div>
                    </div>
                    <div class="collapse" id="collapseAdvance${index}" style="">
                        <div class="d-grid d-sm-flex p-4 border">
                            <p class="mb-0">
                                <strong>Detalle:</strong> ${mensaje}
                            </p>
                        </div>
                    </div>`;
        }).join('');


        html = `<p> <i class="fas fa-info"></i> Recuerda que debes contestar a la solicitud para finalizarla o descartar las entregas, de otro modo se cerrará automaticamente y se otorgaran los puntos correspondientes al voluntario</p> <hr> ${html}`;

        // * AGREGAR BOTON PARA CIERRE DE SOLICITUD
        const solicitud_detalle                                 = data[0].solicitud;
        const { metodo_remuneracion_id, id: solicitud_id }      = solicitud_detalle;
        const { maximo_dias_entrega: solicitud_dias_entrega }   = solicitud_detalle;

        if (metodo_remuneracion_id == 1) {
            btn_aceptar_cerrar_advances.style.display = 'block';
            btn_aceptar_cerrar_advances.innerHTML = '<i class="fas fa-check"></i> Confirmar y finalizar';
            btn_aceptar_cerrar_advances.onclick = () => {
                update_request_confirm_applicant( solicitud_id );
            }
            
        }else if (metodo_remuneracion_id == 2) {
            
            btn_aceptar_cerrar_advances.style.display = 'block';
            btn_aceptar_cerrar_advances.innerHTML = '<i class="fas fa-check"></i> Confirmar y prefinalizar';
            btn_aceptar_cerrar_advances.onclick = () => {
                update_request_prefinished_applicant( solicitud_id, solicitud_dias_entrega );
                // update_request_prefinished_applicant( `"${btoa(solicitud_id)}"`, solicitud_dias_entrega );
            }
        }
    }

    $("#content-modal-advances").html(html);
    $("#modal-advances-request").modal('show');
}

// * PARA CUANDO LA REMUNERACION ES POR PUNTOS
const update_request_confirm_applicant = async (solicitud_id) => {
    $(".modal").modal('hide');

    const { value: swal_confirm} = await Swal.fire({
        title: '¿Estás seguro de finalizar la solicitud?',
        text: "Asegurese de estar conforme con la entrega del voluntario.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, finalizar',
        cancelButtonText: 'Cancelar'
    });

    if (!swal_confirm) return;

    // const solicitud_id = atob(encrypted_id);
    try {

        const id        = solicitud_id;
        const url       = `${BASE_URL_NODE_SERVER}solicitud/finalizar/${solicitud_id}`;
        const token     = localStorage.getItem('token');
        const res   = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
    
        const response = await res.json();
        // console.log("response", response);
        
        const { error, data } = response;

        if (error) {
            throw new Error("Error backend " , error);
        }

        Swal.fire({
            icon: 'success',
            title: 'Solicitud finalizada correctamente',
            toast: true, 
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,    
        });

        await get_requests_my();

        return;
        
    } catch (error) {
        
        Swal.fire({
            icon: 'error',
            title: 'Error al finalizar solicitud',
            toast: true, 
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,    
        });

        console.error( { error : error.message } );
        return;
        
    }
}


// * PARA CUANDO LA REMUNERACION ES POR FAVOR
const update_request_prefinished_applicant = async (solicitud_id, dias_entrega) => {
    $(".modal").modal('hide');

    const { value: swal_confirm} = await Swal.fire({
        title: '¿Estás seguro de finalizar la solicitud?',
        text: `Al finalizar la solicitud, tendra un tiempo maximo de ${dias_entrega} dias de entrega. De otra forma se finalizara automaticamente y se ejecutaran las penalizaciones correspondientes.`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, continuar',
        cancelButtonText: 'Cancelar'
    });

    if (!swal_confirm) return;
    
    try {

        const id        = solicitud_id;
        const url       = `${BASE_URL_NODE_SERVER}solicitud/prefinalizar/${solicitud_id}`;
        const token     = localStorage.getItem('token');
        const res   = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
    
        const response = await res.json();
        // console.log("response", response);
        
        const { error, data } = response;

        if (error) {
            throw new Error("Error backend " , error);
        }

        Swal.fire({
            icon: 'success',
            title: 'Solicitud finalizada correctamente',
            toast: true, 
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,    
        });

        await get_requests_my();

        return;
        
    } catch (error) {
        
        Swal.fire({
            icon: 'error',
            title: 'Error al obtener avances de solicitud',
            toast: true, 
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,    
        });

        console.error( { error : error.message } );
        return;
        
    }
}

const discard_advance = async (encrypted_advance_id) => {
    try {

        $("#modal-advances-request").modal('hide');
        
        const { value: swal_confirm} = await Swal.fire({
            title: '¿Estás seguro de descartar este avance?',
            text: "El voluntario podrá volver a enviar otro avance antes de la fecha límite.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, descartar',
            cancelButtonText: 'Cancelar'
        });
        

        // console.log( { swal_confirm } );
        
        if (!swal_confirm) {
            $("#modal-advances-request").modal('show');
            return
        };


        const advance_id = atob(encrypted_advance_id);
        const url        = `${BASE_URL_NODE_SERVER}solicitud_oferta_evidencia/descartar/${advance_id}`;
        const token      = localStorage.getItem('token');
        
        // console.log({ advance_id, url, token } );
        
        const res        = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        
    
        const response = await res.json();
        const { error, data, message } = response;
        // console.log(response);
        $("#modal-advances-request").modal('show');
        if (error) {
            throw new Error("Error backend " , error);
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

        await get_advances_by_request( btoa(data.solicitud_id) );
        return;

    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error al descartar avance',
            toast: true, 
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,    
        });

        console.error( { error : error.message } );
        return;
    }
    

}