function actualizarReloj() {
    var fecha = new Date();
    var horas = fecha.getHours();
    var minutos = fecha.getMinutes();
    var segundos = fecha.getSeconds();

    // Formatea la hora para asegurar dos dígitos en cada componente
    horas = (horas < 10) ? '0' + horas : horas;
    minutos = (minutos < 10) ? '0' + minutos : minutos;
    segundos = (segundos < 10) ? '0' + segundos : segundos;

    // Construye la cadena de tiempo
    var tiempo = horas + ':' + minutos + ':' + segundos;

    // Actualiza el contenido del elemento con id "reloj"
    document.getElementById('reloj').innerHTML = tiempo;
}

// Llama a la función actualizarReloj cada segundo
setInterval(actualizarReloj, 1000);

// Llama a la función una vez para que se muestre la hora inicial
actualizarReloj();

