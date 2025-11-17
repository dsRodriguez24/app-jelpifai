
const add_advances_by_request_petioner = (id_request_encoded, id_porpose_encoded) => {
    const request_id = atob(id_request_encoded);
    const porpose_id = atob(id_porpose_encoded);

    const solicitud_id          = document.querySelector('#form-add-evidence-petitioner input[name="solicitud_id"]');
    const solicitud_oferta_id   = document.querySelector('#form-add-evidence-petitioner input[name="solicitud_oferta_id"]');
    
    solicitud_id.value          = request_id;
    solicitud_oferta_id.value   = porpose_id;


    $("#modal-add-evidence-petioner-request").modal("show");
}

// * ACTIONS API
const handler_save_evidence_request_petioner = async () => {
    try {
        const url   = `${BASE_URL_NODE_SERVER}solicitud_oferta_evidencia`;
        const token = localStorage.getItem('token');
        
        const form_data = new FormData( document.getElementById('form-add-evidence-petitioner') );
        
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: form_data,
        });
    
        const response                      = await res.json();
        const { error, data, message }      = response;
        
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
        
        $('.modal').modal('hide');
        await get_requests_my();

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

        console.error( { error : error.message } );
        return;
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    try {
        document.getElementById('form-add-evidence-petitioner').addEventListener('submit', async (e) => {
            e.preventDefault();
            await handler_save_evidence_request_petioner();
        });
        
    } catch (error) {
        
    }

});