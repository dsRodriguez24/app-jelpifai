const get_current_week_bounds_utc = () => {
    const now = new Date();

    // Día UTC: 0 = Domingo, 1 = Lunes...
    const utc_day = now.getUTCDay() === 0 ? 7 : now.getUTCDay();

    const monday = new Date(Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate() - (utc_day - 1),
        0, 0, 0, 0
    ));

    const sunday = new Date(Date.UTC(
        monday.getUTCFullYear(),
        monday.getUTCMonth(),
        monday.getUTCDate() + 6,
        23, 59, 59, 999
    ));

    return { monday, sunday };
};


const safe_get_points = (item) => {
    const val = item.puntos_otorgados ?? 0;
    const num = Number(val);
    return Number.isNaN(num) ? 0 : num;
};


const weekly_points_array = (entries) => {
    // console.log(entries);
    
    const { monday, sunday } = get_current_week_bounds_utc();

    const totals = new Array(7).fill(0);

    entries.forEach(item => {
        if (!item?.fecha_registro) return;

        const fecha = new Date(item.fecha_registro);
        if (isNaN(fecha)) return;

        const fecha_utc = fecha.getTime();

        if (fecha_utc < monday.getTime() || fecha_utc > sunday.getTime()) return;

        const utc_day = fecha.getUTCDay(); // 0=Sun ... 6=Sat
        const index = utc_day === 0 ? 6 : utc_day - 1;

        totals[index] += safe_get_points(item);
    });

    return totals;
};




const get_stats = async () => {
    try {
        const url = `${BASE_URL_NODE_SERVER}me/estadisticas`;
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
        
        process_stats(data);
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

        console.error( { error : error.message } );
        return;
        
    }
}

let data_chart_weekly = [];
const process_stats = (data) => {
    console.log("Data", data);
    
    
    let task_finished = document.getElementById("task-finished");
    let task_pending  = document.getElementById("task-pending");
    let new_request   = document.getElementById("new-request");
    let points_gained = document.getElementById("points-gained");

    const puntos_otorgados          = data.solicitudes_puntos;
    const solicitudes_hoy           = data.solicitudes_hoy;
    const solicitudes_pendientes    = data.solicitudes_voluntario.filter(s => s.estado < 6);
    const solicitudes_finalizadas   = data.solicitudes_finalizadas_semana;
    
    const puntos = weekly_points_array(puntos_otorgados);
    data_chart_weekly = puntos;
    
    const puntos_totales_esta_semana    = puntos.reduce((a, b) => a + b, 0);
    points_gained.innerText             = puntos_totales_esta_semana;
    
    const num_solicitudes_hoy   = solicitudes_hoy.length;
    new_request.innerText       = num_solicitudes_hoy;
    
    const num_solicitudes_pendientes = solicitudes_pendientes.length;
    task_pending.innerText          = num_solicitudes_pendientes;

    const num_solicitudes_finalizadas = solicitudes_finalizadas.length;
    task_finished.innerText           = num_solicitudes_finalizadas;

}

document.addEventListener('DOMContentLoaded', async () => {
    setTimeout(() => {
        document.getElementById('h5-title-welcome').innerText = `Bienvenido ${ USER_ME.nombre } ! 🎉`;
    }, 1000);

    await get_stats();
    const options = {
        chart: {
            type: 'line',
            height: 350
        },
        stroke: {
            width: 4,
            curve: 'smooth'
        },
        markers: {
            size: 6
        },
        colors: ['#5586fa'],
        title: {
            text: 'Esta semana',
            align: 'center'
        },
        xaxis: {
            categories: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']
        },
        yaxis: {
            max: 100,
            title: { text: 'Progreso (%)' }
        },
        series: [{
            name: '',
            data: data_chart_weekly
            // data: [10, 30, 45, 65, 75, 85, 100]
        }]
    };
    
    
    const chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();


});

