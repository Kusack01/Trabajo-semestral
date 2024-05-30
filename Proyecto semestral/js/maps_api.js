// Función para inicializar el mapa
function initMap() {
    // Coordenadas para centrar el mapa (ejemplo: Ciudad de México)
    var coordenadas = { lat: 19.4326, lng: -99.1332 };
  
    // Crear un nuevo mapa en el elemento con id "mapa"
    var mapa = new google.maps.Map(document.getElementById('mapa'), {
      zoom: 10, // Nivel de zoom
      center: coordenadas // Centrar el mapa en las coordenadas especificadas
    });
  
    // Marcador en las coordenadas especificadas
    var marcador = new google.maps.Marker({
      position: coordenadas,
      map: mapa,
      title: 'Mi Marcador' // Título del marcador (opcional)
    });
  }
  