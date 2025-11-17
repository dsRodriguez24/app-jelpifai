const get_request_by_id = async (solicitud_id_encrypted) => {

    const solicitud_id  = atob(solicitud_id_encrypted);
    
    try {
        const url = `${BASE_URL_NODE_SERVER}solicitud/${solicitud_id}`;
        const token = localStorage.getItem('token');
        const res = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });
    
        const response                  = await res.json();
        const { error, data, message }  = response;
        
        if (error) {
            throw new Error("Error backend " , message);
        }
        
        add_fields_to_modal_update(data);
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

const add_fields_to_modal_update = (data) => {

    // * PROCESAR ELEMENTOS DEL MODAL
    const modal_elements = document.querySelectorAll('#form-update-request input, #form-update-request select, #form-update-request textarea');
    modal_elements.forEach(element => {
        try {
            if (element.type != 'file') {
                element.value = data[element.name];
                element.dispatchEvent(new Event('change'));
            }
            
        } catch (error) {
            console.warn(`Elemento ${element.name} no encontrado`);
            
        }
    });

    // * VACIAR CONTENEDOR DE ARCHIVOS
    const content_previus_files = document.querySelector('#form-update-request #previously-uploaded-files');
    content_previus_files.innerHTML = '';
    
    // * AGREGAR ARCHIVOS
    const { archivos } = data;
    try {
        if ( archivos.length > 0 ) {
            content_previus_files.innerHTML = ` <label class="form-label"> Imagenes cargadas previamente </label>
                                                <div class="d-flex gap-2 flex-wrap" id="preview-container-uploaded-files"></div>`;
            

            const html_files_uploaded_previously = archivos.map((file, index) => {
                let { nombre_archivo, id } = file;
                let url = `${BASE_URL_SUPABASE_FILES}${nombre_archivo}`; 
                // let url = `${BASE_URL_NODE_SERVER}uploads/${nombre_archivo}`; 

                const removeBtn     = `<i class='fas fa-times text-danger position-absolute top-0 end-0 m-1' onclick='delete_file_uploades_previously(${id})'></i>`;
                return `
                <div id="div-file-uploaded-${id}" class="position-relative border rounded p-1" style="width: 100px; height: 100px; overflow: hidden; display: flex; justify-content: center; align-items: center;">
                    <img src="${url}" style="width: 100%; height: 100%; object-fit: cover;">
                    ${removeBtn}
                </div>
                `;
            });

            content_previus_files.innerHTML += html_files_uploaded_previously.join('');
            content_previus_files.innerHTML += `<hr>`;
            
        }


    } catch (error) {
        console.warn("Error al anexar archivos " ,  error.message);
        
    }


    // * AGREGAR ID
    const request_id = document.querySelector('#form-update-request #request_id');
    request_id.value = data.id;

    $("#modal-update-request").modal('show');

}

const delete_file_uploades_previously = async (id) =>{
    $("#modal-update-request").modal('hide');
    const { value: respuesta_swal } = await Swal.fire({
        icon: 'question',
        title: '¿Desea eliminar el archivo?',
        text: 'Esta accion no se puede deshacer',
        showDenyButton: true,
        confirmButtonText: 'Si',
        denyButtonText: `No`,
    });

    if (!respuesta_swal) {
        $("#modal-update-request").modal('show');
        return;
    }

    try {
        const url   = `${BASE_URL_NODE_SERVER}solicitud_archivos/${id}`;
        const token = localStorage.getItem('token');
        const res   = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });
    
        const response                  = await res.json();
        const { error, message }  = response;

        Swal.fire({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            icon: error ? 'error' : 'success',
            title: message,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        });

        if (error) {
            throw new Error("Error backend " , error);
        }

        const div_to_delete = document.querySelector(`#div-file-uploaded-${id}`);
        div_to_delete.remove();
        
    }catch (error) {
        console.error( { error : error.message } );
        return;
    }
    

    $("#modal-update-request").modal('show');

}


const reset_modal_update = () => {
    const elements_from_modal = document.querySelectorAll('#form-update-request input, #form-update-request select, #form-update-request textarea');
    elements_from_modal.forEach(element => {
        element.value = '';
    });

    const modal_divs_files = document.querySelectorAll('#form-update-request #previously-uploaded-files #preview-container-update');
    modal_divs_files.forEach(element => {
        element.innerHTML = '';
    });
}

// * FUNCIONES
let files_update = []; // Aquí guardaremos todos los archivos (fotos + documentos)

const previewContainerUpdate    = document.getElementById('preview-container-update');
const fileInputUpdate           = document.getElementById('file-input-update');


fileInputUpdate.addEventListener('change', (e) => {
    for (const file of e.target.files_update) add_file_update(file);
});

function add_file_update(file) {
    files_update.push(file);
    render_files_update();
}

function remove_file_update(index) {
    files_update.splice(index, 1);
    render_files_update();
}

function render_files_update() {
    previewContainerUpdate.innerHTML = '';
    files_update.forEach((file, i) => {
        const preview                   = document.createElement('div');
        preview.className               = 'position-relative border rounded p-1';
        preview.style.width             = '100px';
        preview.style.height            = '100px';
        preview.style.overflow          = 'hidden';
        preview.style.display           = 'flex';
        preview.style.justifyContent    = 'center';
        preview.style.alignItems        = 'center';

        if (file.type.startsWith('image/')) {
            const img = document.createElement('img');
            img.src = URL.createObjectURL(file);
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.objectFit = 'cover';
            preview.appendChild(img);
        } else {
            preview.innerHTML = `<i class="fas fa-file-alt fa-2x text-secondary"></i>`;
        }

        const removeBtn     = document.createElement('i');
        removeBtn.className = 'fas fa-times text-danger position-absolute top-0 end-0 m-1';
        removeBtn.onclick   = () => remove_file_update(i);
        // const removeBtn     = document.createElement('button');
        // removeBtn.className = 'btn btn-sm btn-danger position-absolute top-0 end-0 m-1';
        // removeBtn.innerHTML = '<i class="fas fa-times"></i>';
        // removeBtn.onclick   = () => remove_file_update(i);

        preview.appendChild(removeBtn);
        previewContainerUpdate.appendChild(preview);
    });
}

// Tomar foto usando cámara
function take_photo_update() {
    const input     = document.createElement('input');
    input.type      = 'file';
    input.accept    = 'image/*';
    input.capture   = 'environment'; // abre cámara directamente
    input.onchange  = e => {
        const file  = e.target.files[0];
        if (file) add_file_update(file);
    };
    input.click();
}

const handler_change_tipo_rem_update  = (tipo) => {
    const div_puntos_ofrecidos = document.getElementById("div-puntos-ofrecidos");
    const puntos_ofrecidos     = document.querySelector("input[name='puntos_ofrecidos']");
    
    puntos_ofrecidos.value = 0;
    puntos_ofrecidos.dispatchEvent(new Event('change'));
    
    if (tipo == '1') {
        div_puntos_ofrecidos.style.display = 'block';
        return;
    }
    
    div_puntos_ofrecidos.style.display = 'none';

}

// * GUARDAR
const handler_submit_update_request = async () => {
    const btn_submit = document.querySelector('#form-update-request button[type="submit"]');
    try {
        btn_submit.disabled     = true;
        btn_submit.innerHTML    = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Guardando...';

        const request_id = document.querySelector('#form-update-request #request_id').value;
        if (isNaN(request_id) || request_id <= 0) {
            throw new Error("Solicitud desconocida");
        }
        
        const form       = document.getElementById('form-update-request');
        const form_data  = new FormData(form);
        const url        = `${BASE_URL_NODE_SERVER}solicitud/${request_id}`;
        const token      = localStorage.getItem('token');
    
        files_update.forEach(f => form_data.append('files', f));
    
        const res       = await fetch(url, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: form_data,
        });
    
        const response  = await res.json();
        const { error, data, message } = response;

        if (error) {
            throw new Error(message);
            return ;
        }

        Swal.fire({
            icon: error ? 'error' : 'success',
            title: message,
            showConfirmButton: false,
            timer: 3000,
            toast: true,
            position: 'top-end',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            }
        });
        
        
        $(".modal").modal('hide');
        reset_modal_update();
        await get_requests_my();
        
        
    } catch (error) {
        Swal.fire({
            icon: error ? 'error' : 'success',
            title: error.message,
            showConfirmButton: false,
            timer: 3000,
            toast: true,
            position: 'top-end',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            }
        });

        console.error("Error inesperado", error);

    }finally {
        btn_submit.disabled  = false;
        btn_submit.innerHTML = '<i class="fas fa-bookmark"></i> Actualizar';
    }
    
}


document.addEventListener('DOMContentLoaded', () => {
    document.querySelector("#form-update-request").addEventListener("submit", (e) => {
        e.preventDefault();
        handler_submit_update_request();
    });
});
