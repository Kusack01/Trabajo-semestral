document.addEventListener('DOMContentLoaded', () => {
  let productos = JSON.parse(localStorage.getItem('productos')) || [];

  const formProducto = document.getElementById('form-producto');
  const productosTableBody = document.getElementById('productosTableBody');
  const formEditarProducto = document.getElementById('form-editar-producto');
  const editarProductoModal = new bootstrap.Modal(document.getElementById('editarProductoModal'));

  const renderProductos = () => {
      productosTableBody.innerHTML = '';
      productos.forEach((producto, index) => {
          const row = document.createElement('tr');
          row.innerHTML = `
              <td>${producto.nombre}</td>
              <td>${producto.precio}</td>
              <td>${producto.stock}</td>
              <td>
                  <button class="btn btn-warning btn-sm" onclick="editarProducto(${index})">Editar</button>
                  <button class="btn btn-danger btn-sm" onclick="eliminarProducto(${index})">Eliminar</button>
              </td>
          `;
          productosTableBody.appendChild(row);
      });
  };

  formProducto.addEventListener('submit', (e) => {
      e.preventDefault();
      const nuevoProducto = {
          nombre: document.getElementById('nombreProducto').value,
          precio: document.getElementById('precioProducto').value,
          stock: document.getElementById('stockProducto').value
      };
      productos.push(nuevoProducto);
      localStorage.setItem('productos', JSON.stringify(productos));
      formProducto.reset();
      renderProductos();
  });

  window.editarProducto = (index) => {
      document.getElementById('editarNombreProducto').value = productos[index].nombre;
      document.getElementById('editarPrecioProducto').value = productos[index].precio;
      document.getElementById('editarStockProducto').value = productos[index].stock;
      formEditarProducto.onsubmit = (e) => {
          e.preventDefault();
          productos[index].nombre = document.getElementById('editarNombreProducto').value;
          productos[index].precio = document.getElementById('editarPrecioProducto').value;
          productos[index].stock = document.getElementById('editarStockProducto').value;
          localStorage.setItem('productos', JSON.stringify(productos));
          renderProductos();
          editarProductoModal.hide();
      };
      editarProductoModal.show();
  };

  window.eliminarProducto = (index) => {
      productos.splice(index, 1);
      localStorage.setItem('productos', JSON.stringify(productos));
      renderProductos();
  };

  renderProductos();
});
