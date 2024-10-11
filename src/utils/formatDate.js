export const formatearFechaNacional =(fecha)=>{
    const opciones = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    };

    const fechaFormateada = new Intl.DateTimeFormat('es-CL', opciones).format(new Date(fecha));
    return fechaFormateada;
}