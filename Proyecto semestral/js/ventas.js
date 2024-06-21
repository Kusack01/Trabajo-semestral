// Suponiendo que tienes un array de ventas (simulado o cargado desde una base de datos)
let ventas = [
  { id: 1, producto: "Zapatillas deportivas", cantidad: 2, fecha: "2024-06-20" },
  { id: 2, producto: "Sandalias de verano", cantidad: 1, fecha: "2024-06-19" }
];

// Función para mostrar las ventas en la tabla
function mostrarVentas() {
  const tablaVentas = document.getElementById('tablaVentas');
  tablaVentas.innerHTML = '';

  ventas.forEach((venta, index) => {
      const fila = `
          <tr>
              <th scope="row">${index + 1}</th>
              <td>${venta.producto}</td>
              <td>${venta.cantidad}</td>
              <td>${venta.fecha}</td>
              <td>
                  <button type="button" class="btn btn-sm btn-danger" onclick="eliminarVenta(${venta.id})">Eliminar</button>
              </td>
          </tr>
      `;
      tablaVentas.innerHTML += fila;
  });
}

// Función para agregar una nueva venta
function agregarVenta(producto, cantidad) {
  // Aquí podrías realizar la lógica para agregar la venta a tu sistema o base de datos
  // Por ahora, simularemos que agregamos la venta al array ventas
  const nuevaVenta = {
      id: ventas.length + 1,
      producto: producto,
      cantidad: cantidad,
      fecha: obtenerFechaActual()
  };
  ventas.push(nuevaVenta);
  mostrarVentas(); // Actualizar la tabla de ventas
}

// Función para obtener la fecha actual en formato YYYY-MM-DD
function obtenerFechaActual() {
  const now = new Date();
  const year = now.getFullYear();
  let month = now.getMonth() + 1;
  let day = now.getDate();
  month = (month < 10) ? `0${month}` : month;
  day = (day < 10) ? `0${day}` : day;
  return `${year}-${month}-${day}`;
}

// Función para manejar el envío del formulario de ventas
document.getElementById('form-venta').addEventListener('submit', function(event) {
  event.preventDefault();
  const producto = document.getElementById('productoVenta').value;
  const cantidad = parseInt(document.getElementById('cantidadVenta').value);

  if (producto && cantidad) {
      agregarVenta(producto, cantidad);
      // Aquí podrías resetear el formulario o realizar otras acciones después de agregar la venta
      document.getElementById('productoVenta').value = '';
      document.getElementById('cantidadVenta').value = '';
  } else {
      alert('Por favor completa todos los campos.');
  }
});

// Función para eliminar una venta
function eliminarVenta(idVenta) {
  ventas = ventas.filter(venta => venta.id !== idVenta);
  mostrarVentas(); // Actualizar la tabla de ventas después de eliminar
}

// Función para mostrar alerta de stock bajo
function mostrarAlertaStockBajo(producto, cantidadDisponible) {
  const mensaje = `¡Alerta! El producto "${producto}" tiene un stock bajo (${cantidadDisponible} unidades).`;
  alert(mensaje);
}

// Función para manejar la adición de ventas y verificar stock
function agregarVenta(producto, cantidad) {
  // Aquí deberías tener una lógica para verificar si hay suficiente stock
  // Como es una implementación simulada, supondremos que siempre hay suficiente stock
  const nuevaVenta = {
      id: ventas.length + 1,
      producto: producto,
      cantidad: cantidad,
      fecha: obtenerFechaActual()
  };
  ventas.push(nuevaVenta);
  mostrarVentas(); // Actualizar la tabla de ventas

  // Aquí puedes agregar una lógica para verificar si hay stock bajo y mostrar una alerta si es necesario
  // Por ejemplo, supongamos que el stock mínimo aceptable es de 5 unidades
  const stockMinimo = 5;
  if (cantidad <= stockMinimo) {
      mostrarAlertaStockBajo(producto, cantidad);
  }
}

// Función para obtener la fecha actual en formato YYYY-MM-DD
function obtenerFechaActual() {
  const now = new Date();
  const year = now.getFullYear();
  let month = now.getMonth() + 1;
  let day = now.getDate();
  month = (month < 10) ? `0${month}` : month;
  day = (day < 10) ? `0${day}` : day;
  return `${year}-${month}-${day}`;
}

// Función para inicializar la tabla de ventas al cargar la página
window.onload = function() {
  mostrarVentas();
};
