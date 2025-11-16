// * FUNCIONES
let files = []; // Aquí guardaremos todos los archivos (fotos + documentos)

const previewContainer  = document.getElementById('preview-container');
const fileInput         = document.getElementById('file-input');

fileInput.addEventListener('change', (e) => {
    for (const file of e.target.files) add_file(file);
});

function add_file(file) {
    files.push(file);
    render_files();
}

function remove_file(index) {
    files.splice(index, 1);
    render_files();
}

function render_files() {
    previewContainer.innerHTML = '';
    files.forEach((file, i) => {
        const preview = document.createElement('div');
        preview.className = 'position-relative border rounded p-1';
        preview.style.width = '100px';
        preview.style.height = '100px';
        preview.style.overflow = 'hidden';
        preview.style.display = 'flex';
        preview.style.justifyContent = 'center';
        preview.style.alignItems = 'center';

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
        removeBtn.onclick   = () => remove_file(i);
        // const removeBtn     = document.createElement('button');
        // removeBtn.className = 'btn btn-sm btn-danger position-absolute top-0 end-0 m-1';
        // removeBtn.innerHTML = '<i class="fas fa-times"></i>';
        // removeBtn.onclick   = () => remove_file(i);

        preview.appendChild(removeBtn);
        previewContainer.appendChild(preview);
    });
}

// Tomar foto usando cámara
function take_photo() {
    const input     = document.createElement('input');
    input.type      = 'file';
    input.accept    = 'image/*';
    input.capture   = 'environment'; // abre cámara directamente
    input.onchange  = e => {
        const file  = e.target.files[0];
        if (file) add_file(file);
    };
    input.click();
}

const handler_change_tipo_rem  = (tipo) => {
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

const reset_modal_save = () => {
    const elements_from_modal = document.querySelectorAll('#form-update-request input, #form-update-request select, #form-update-request textarea');
    elements_from_modal.forEach(element => {
        element.value = '';
    });

    const modal_divs_files = document.querySelectorAll('#form-update-request #previously-uploaded-files #preview-container-update');
    modal_divs_files.forEach(element => {
        element.innerHTML = '';
    });
}

// * GUARDAR
const handler_submit_request = async () => {
    const puntos_ofrecidos        = document.querySelector('#form-new-request input[name="puntos_ofrecidos"]').value;
    const metodo_remuneracion_id  = document.querySelector('#form-new-request select[name="metodo_remuneracion_id"]').value;
    
    if (puntos_ofrecidos < 2 && metodo_remuneracion_id == 1) {
        Swal.fire({
            icon: 'warning',
            title: 'La remuneracion minima es de 5 puntos',
            showConfirmButton: false,
            timer: 3000,
            toast: true,
            position: 'top-end',
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        });
        return;
    }


    const btn_submit = document.querySelector('#form-new-request button[type="submit"]');
    try {
        btn_submit.disabled = true;
        btn_submit.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Guardando...';


        const form       = document.getElementById('form-new-request');
        const form_data  = new FormData(form);
        const url        = `${BASE_URL_NODE_SERVER}solicitud`;
        const token      = localStorage.getItem('token');
    
        files.forEach(f => form_data.append('files', f));
    
        const res       = await fetch(url, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: form_data,
        });
    
        const response  = await res.json();
        reset_modal_save();
        process_submit_request(response);
    } catch (error) {
        
        Swal.fire({
            icon: 'error',
            title: 'Ocurrio un error inesperado',
            showConfirmButton: false,
            timer: 3000,
            toast: true,
            position: 'top-end',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            }
        });

    }finally {
        btn_submit.disabled  = false;
        btn_submit.innerHTML = '<i class="fas fa-bookmark"></i> Crear';
    }
    
}


const process_submit_request = (response) => {
    const { error, data, message } = response;
    
    Swal.fire({
        icon: error? 'error' : 'success',
        title: message,
        showConfirmButton: false,
        timer: 3000,
        toast: true,
        position: 'top-end',
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    });

    if (error) {
        console.error(error);
        return;
    }

    (async () => {
        try {
            await get_requests_available();
            $(".modal").modal("hide");
        } catch (error) {
            try {
                await get_requests_my();
                $(".modal").modal("hide");
            } catch (error) {
                
            }
        }
    }
    )();
    
}

document.addEventListener('DOMContentLoaded', async () => {
    const form_new_request = document.getElementById('form-new-request');
    form_new_request.addEventListener('submit', function (e) {
        e.preventDefault();
        handler_submit_request();
    });

    setTimeout(() => {
        // console.log( { USER_ME } );
        
        const puntos_disponibles = isNaN(USER_ME.puntos.puntos_disponibles) ? 0 : parseInt(USER_ME.puntos.puntos_disponibles);
        document.querySelector('#form-new-request input[name="puntos_ofrecidos"]').max = puntos_disponibles;
    }, 2500);

});