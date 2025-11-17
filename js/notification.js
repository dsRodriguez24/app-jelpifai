const get_notifications = async () => {
    try {
        const token = localStorage.getItem('token');
        const url = `${BASE_URL_NODE_SERVER}me/notificaciones`;
        const res = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });
    
        const response = await res.json();
        // console.log("Response notificaciones " , response);
        
        const { error, data, message } = response;
        if (error) {
            throw new Error("Error " , error , message);
        }

        process_notifications(data);
        return data;
        
    } catch (error) {
        console.error("Error " , error.message);
    }
}

const process_notifications = ( data ) => {
    let list_notifications = document.querySelector("#header-messages-list");
    try {
        const notificaciones_sin_leer = data.filter( notification => notification.leida == '0').length;

        list_notifications.innerHTML = "";
        const notifications_html = data.map( notification => `
            <li>
                <a class="dropdown-item" href="#">
                    <i class='bx bx-bell'></i> 
                    <span class="align-middle">${notification.notificacion}</span>
                </a>
            </li>
        `).join("");
        list_notifications.innerHTML = notifications_html;
    } catch (error) {
        console.error("Error " , error.message);
        list_notifications.innerHTML = `<li>
                                            <a class="dropdown-item" href="#">
                                                <i class='bx bx-bell'></i> 
                                                <span class="align-middle">Sin Notificaciones</span>
                                            </a>
                                        </li>`;
    }
}

const get_notifications_by_click = async () => {
    await get_notifications();
}

// const get_notifications_toast = async () => {
//     // console.log("Ejecutado");
    
//     const notifications_all             = await get_notifications();
    
//     try {
//         const notifications_without_read    = notifications_all.filter( notification => notification.leida == '0');
//         const first_notification            = notifications_without_read[0];
//         // console.log( { notifications_all, notifications_without_read, first_notification } );
//         if (first_notification) {
//             const { fecha_registro  } = first_notification;


//             Swal.fire({
//                 icon: 'info',
//                 title: first_notification.notificacion,
//                 toast: true,
//                 position: 'top-end',
//                 showConfirmButton: false,
//                 timer: 3000
//             });
//         }


//     } catch (error) {
//         console.warn("Toast de notificaciones no procesable");
        
//     }
// }

const get_notifications_toast = async () => {

    const notifications_all = await get_notifications();

    try {
        const now = new Date();

        // Filtrar las no leídas y que tengan menos de 30 seg desde su registro
        const notifications_filtered = notifications_all.filter(notification => {
            if (notification.leida !== '0') return false;

            const fecha_registro = new Date(notification.fecha_registro);
            const diff_ms = now - fecha_registro;  // diferencia en milisegundos
            const diff_seconds = diff_ms / 1000;

            return diff_seconds <= 30;   // no mayor a 30s
        });

        const first_notification = notifications_filtered[0];

        if (first_notification) {

            Swal.fire({
                icon: 'info',
                title: first_notification.notificacion,
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000
            });
        }

    } catch (error) {
        console.warn("Toast de notificaciones no procesable");
    }
};


document.addEventListener('DOMContentLoaded', async function () {
    // await get_notifications();
    // setInterval( async () => {
    //     await get_notifications();
    // }, 5000);

    setInterval( async () => {
        await get_notifications_toast();
    }, 5000);
})