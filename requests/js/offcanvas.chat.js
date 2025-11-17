let search_messages_from_request = false;

const get_messages_by_request = async (solicitud_id_encrypted, spinner = true) => {
    const solicitud_id  = atob(solicitud_id_encrypted);
    document.querySelector(`#form-send-message #solicitud_id`).value = solicitud_id;
    

    const spiner_loader = document.querySelector('#offcanvasChat #spinner-loader-chat');
    
    if (spinner) {
        spiner_loader.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Cargando...';
    }
    
    try {
        const url = `${BASE_URL_NODE_SERVER}solicitud_mensajes/${solicitud_id}/mensajes`;;
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

        
        process_messages(data);
        spiner_loader.innerHTML = '';

        search_messages_from_request = true;
        return;
    } catch (error) {
        console.error( "Error " , error.message );
        spiner_loader.innerHTML = '';
        return;
    }
}

const process_messages = (messages) => {
    const user_id = USER_ME.id;
    let messages_list = ``;

    const messages_container = document.querySelector('.chat-history .list-unstyled');
    messages_container.innerHTML = '';
    messages.forEach((message) => {
        const { fecha_registro , usuario_id , mensaje } = message;
        messages_container.innerHTML += `   <li class="chat-message ${user_id === usuario_id ? 'chat-right' : 'chat-left'}  mb-3">
                                                <div class="msg-container">
                                                    <p class="msg-text">${mensaje}</p>
                                                    <small class="msg-time">${fecha_registro}</small>
                                                </div>
                                                <img src="../assets/img/avatars/user.png" class="chat-avatar">
                                            </li>`;
    });
}   


const handler_submit_send_message = async () => {
    
    try {
        const message_field = document.querySelector('#offcanvasChat input[name="mensaje"]');
        if (message_field.value == '') return;
    
        const solicitud_id  = document.querySelector(`#form-send-message #solicitud_id`).value;
        const form          = document.getElementById('form-send-message');
        const form_data     = new FormData(form);
    
        const url = `${BASE_URL_NODE_SERVER}solicitud_mensajes`;;
        const token = localStorage.getItem('token');
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(Object.fromEntries(form_data)),
        });
    
        const response           = await res.json();
        const { error, message } = response;
        if (error) {
            console.error("Error " , error);
            throw new Error("Error al enviar mensaje");
        }
        
        message_field.value == '';
        await get_messages_by_request( btoa(solicitud_id), false);
        return;
        
    } catch (error) {
        console.error("Error send message " , error.message);
        
        Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            },
            icon: 'error',
            title: 'Error al enviar mensaje',
        })
    }
}

document.addEventListener('DOMContentLoaded', () => {
    
    document.querySelector("#offcanvasChat #form-send-message").addEventListener("submit", async (e) => {
        e.preventDefault();
        await handler_submit_send_message();
    });
    
    
    const offcanvas = document.getElementById('offcanvasChat');
    offcanvas.addEventListener('hidden.bs.offcanvas', function () {
        search_messages_from_request = false;
        // console.log("El offcanvas se ha cerrado completamente");
    });

    setInterval( async () => {
        if (!search_messages_from_request) return

        const solicitud_id = document.querySelector(`#form-send-message #solicitud_id`).value;
        if ( isNaN( solicitud_id ) ) return;

        await get_messages_by_request( btoa(solicitud_id) , false)

    }, 3000);
});