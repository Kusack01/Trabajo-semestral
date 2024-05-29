document.addEventListener("DOMContentLoaded", function () {
    if (navigator.geolocation) {
        // ubicacion de usurio al entrar a la pag
        navigator.geolocation.getCurrentPosition(
            function(position) {
                // sacar coordenadas 
                const latitud = position.coords.latitude;
                const longitud = position.coords.longitude;

                // sacar clima usando coordenadas
                obtenerClimaPorCoordenadas(latitud, longitud);
            },
            function(error) {
                console.error("Error al obtener la ubicación:", error);
            }
        );
    } else {
        console.error("Geolocalización no es compatible en este navegador.");
    }
});

function obtenerClimaPorCoordenadas(latitud, longitud) {
    //Instalar API Key
    const apiKey = '9a2825e6fe9e592083d6dbc94f8bf5f9'; 

    // crear URL junto a coordenadas
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitud}&lon=${longitud}&appid=${apiKey}&units=metric`;

    // usar fetch para solicitar la API
    fetch(apiUrl)
        .then(response => response.json())
        .then(datosClima => {
            // Mostar en html
            mostrarResultado(datosClima);
        })
        .catch(error => {
            console.error("Error al obtener datos de la API:", error);
        });
}

function mostrarResultado(datosClima) {
    
    const resultadoDiv = document.getElementById('resultado');

    // despegar contenido anterior
    resultadoDiv.innerHTML = "";

    // respuesta if funciona 
    if (datosClima.cod === '404') {
        resultadoDiv.textContent = 'No se pudo obtener la información del clima.';
    } else {
        const temperatura = datosClima.main.temp;
        const descripcion = datosClima.weather[0].description;

        // mostar info en el html
        resultadoDiv.innerHTML = `<p>Temperatura actual!: ${temperatura} °C</p>
                                   <p>Estado del dia: ${descripcion}</p>`;
    }
}
