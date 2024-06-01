console.log("Esta funcionando")
const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Cargar el carrito almacenado al cargar la página
document.addEventListener('DOMContentLoaded', actualizarCarrito);

document.querySelectorAll('.agregar').forEach(button => {
    button.addEventListener('click', agregarAlCarrito);
});

document.getElementById('pagar').addEventListener('click', pagar);

function agregarAlCarrito(event) {
    const producto = event.target.parentElement;
    const nombre = producto.dataset.nombre;
    const precio = parseFloat(producto.dataset.precio);
    const stock = parseInt(producto.dataset.stock);

    if (stock > 0) {
        carrito.push({ nombre, precio });
        producto.dataset.stock = stock - 1;
        actualizarCarrito();
    } else {
        alert('¡Producto agotado!');
    }
}

function eliminarDelCarrito(index) {
    const producto = carrito[index];
    const item = document.querySelectorAll('.producto');
    const productoHTML = Array.from(item).find(p => p.dataset.nombre === producto.nombre);
    const productoInfo = document.querySelector(`.info-product[data-nombre="${producto.nombre}"]`);

    if (productoHTML && productoInfo) {
        productoHTML.dataset.stock = parseInt(productoHTML.dataset.stock) + 1;
        productoInfo.dataset.stock = parseInt(productoInfo.dataset.stock) + 1;
    }

    carrito.splice(index, 1);
    actualizarCarrito();
}

function actualizarCarrito() {
    const carritoElemento = document.getElementById('carrito');
    carritoElemento.innerHTML = '';

    let total = 0;
    carrito.forEach((producto, index) => {
        total += producto.precio;
        const li = document.createElement('li');
        li.textContent = `${producto.nombre} - $${producto.precio}`;
        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.addEventListener('click', () => eliminarDelCarrito(index));
        li.appendChild(botonEliminar);
        carritoElemento.appendChild(li);
    });

    document.getElementById('total').textContent = `Total: $${total}`;
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function pagar() {
    if (carrito.length === 0) {
        alert('El carrito está vacío.');
    } else {
        alert('Gracias por tu compra. Total a pagar: $' + document.getElementById('total').textContent.split('$')[1]);
        carrito.length = 0; // Vaciar el carrito
        actualizarCarrito();
    }
}
