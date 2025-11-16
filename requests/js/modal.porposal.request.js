const get_proposal_by_request = async (id_encrypted) => {
    try {

        const id    = atob(id_encrypted);
        const url   = `${BASE_URL_NODE_SERVER}solicitud_oferta/solicitud/${id}`;
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
        
        add_porposals_to_modal(data);

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



const add_porposals_to_modal = (data) => {

    let html = '<p>Aun no hay propuestas. Consulta en las proximas horas</p>';
    if (data.length > 0) {
        html = data.map( ( proposal, index ) =>  {

            const { usuario : voluntario, puntuacion_voluntario }  =  proposal;
            const nombre_voluntario                                =  `${voluntario.nombre} ${voluntario.apellido}` 

            let stars_fill = 0;
            if (puntuacion_voluntario) {
                stars_fill = parseInt(puntuacion_voluntario);
            }

            let stars_empty = 5 - stars_fill;

            let stars = '';
            for (let i = 0; i < stars_fill; i++) {
                stars += `<i class="fas fa-star"></i>`;
            }
            for (let i = 0; i < stars_empty; i++) {
                stars += `<i class="fa-regular fa-star"></i>`;
            }

            return `<div class="col-12 d-flex justify-content-between">
                        <div>
                            <a class="me-1 collapsed" style="text-decoration: none" data-bs-toggle="collapse" href="#collapsePorposal${index}" role="button" aria-expanded="false" aria-controls="collapsePorposal${index}"> <i class='fas fa-people-arrows-left-right'></i> Propuesta ${index+1} | ${nombre_voluntario} | ${stars}</a>
                        </div>
                        
                        <div class='d-flex align-content-center'>
                            <a title="Aceptar" class="btn btn-icon btn-sm btn-primary text-white mx-1 my-1" onclick='accept_proposal("${btoa(proposal.id)}")'> <i class='fas fa-check'></i></a>
                            <a title="Denegar" class="btn btn-icon btn-sm btn-danger text-white mx-1 my-1" onclick='deny_proposal("${btoa(proposal.id)}")'> <i class='fas fa-xmark'></i></a>
                        </div>
                    </div>
                    <div class="collapse" id="collapsePorposal${index}" style="">
                        ${proposal.mensaje_oferta ? `
                            <div class="d-grid d-sm-flex p-4 border">
                                <p class="mb-0">
                                    <strong>Propuesta:</strong> ${proposal.mensaje_oferta}
                                </p>
                            </div>
                            ` : ``}
                    </div>`;
        }).join('');
    }


    $("#content-modal-porposals").html(html);
    $("#modal-porposals-request").modal('show');
}


const accept_proposal = async (id_encrypted) => {
    $(".modal").modal('hide');
    
    const { value: accept } = await Swal.fire({
        icon: 'question',
        title: 'Confirmar',
        text: '¿Desea aceptar la propuesta?',
        showDenyButton: true,
        confirmButtonText: 'Si',
        denyButtonText: `No`,
    });

    if (!accept) {
        return;
    }

    const id    = atob(id_encrypted);
    const url   = `${BASE_URL_NODE_SERVER}solicitud_oferta/aceptar/${id}`;
    const token = localStorage.getItem('token');
    const res   = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    });

    const response                  = await res.json();
    const { error, data, message }  = response;

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
        console.error( { error } );
        return;
    }

    // ? OBTENER MIS REQUESTS
    await get_requests_my();

}


const deny_proposal = async (id_encrypted) => {

    $(".modal").modal('hide');
    
    const { value: accept } = await Swal.fire({
        icon: 'question',
        title: 'Confirmar',
        text: '¿Desea denegar la propuesta?. Recuerde que no se mostraría mas',
        showDenyButton: true,
        confirmButtonText: 'Si',
        denyButtonText: `No`,
    });

    if (!accept) {
        return;
    }

    const id    = atob(id_encrypted);
    const url   = `${BASE_URL_NODE_SERVER}solicitud_oferta/denegar/${id}`;
    const token = localStorage.getItem('token');
    const res   = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    });

    const response                  = await res.json();
    const { error, data, message }  = response;

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
        console.error( { error } );
        return;
    }

    // ? OBTENER MIS REQUESTS
    await get_requests_my();

}