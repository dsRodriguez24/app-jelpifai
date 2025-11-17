const show_points_stars = (points) => {
    let divs_stars = '';

    // Estrellas llenas
    for (let i = 1; i <= points; i++) {
        divs_stars += `
            <div class="col-2" onclick="show_points_stars(${i})">
                <h1 class="text-primary"><i class="fas fa-star"></i></h1>
            </div>`;
    }

    // Estrellas vacías
    for (let j = points + 1; j <= 5; j++) {
        divs_stars += `
            <div class="col-2" onclick="show_points_stars(${j})">
                <h1 class="text-primary"><i class="fa-regular fa-star"></i></h1>
            </div>`;
    }

    document.querySelector('#modal-points-div-stars').innerHTML = `<div class="col-1"></div>` + divs_stars + `<div class="col-1"></div>`;
    document.querySelector('#form-points input[name="calificacion_voluntario"]').value = points;
};



const handler_submit_points = async () => {
    try {

        const solicitud_id  = document.querySelector('#form-points #solicitud_id').value;
        const form_points   = document.getElementById("form-points");
        const formData      = new FormData(form_points);
        const url           = `${BASE_URL_NODE_SERVER}solicitud/calificar/${solicitud_id}`;
        const token         = localStorage.getItem('token');
        const res           = await fetch(url, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(Object.fromEntries(formData)),
        });

        const response                  = await res.json();
        // console.log("response", response);
        
        const { error, message }  = response;
        if (error) {
            throw new Error( message, error );
        }

        Swal.fire({
            icon: 'success',
            title: message,
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        });

        await get_requests_my();
        $(".modal").modal("hide");

    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: error.message,
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        });
        
        console.error( { error } )
    }
};

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("form-points").addEventListener("submit", (e) => {
        e.preventDefault();
        handler_submit_points();
    })
});