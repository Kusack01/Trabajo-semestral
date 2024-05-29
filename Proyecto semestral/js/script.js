document.addEventListener('DOMContentLoaded', () => {
    const addProductForm = document.getElementById('addProductForm');
    const productList = document.getElementById('productList');

    addProductForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(addProductForm);

        const response = await fetch('/api/products', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();
        if (result.success) {
            addProductToList(result.product);
        }
    });

    async function loadProducts() {
        const response = await fetch('/api/products');
        const products = await response.json();
        products.forEach(product => addProductToList(product));
    }

    function addProductToList(product) {
        const productElement = document.createElement('div');
        productElement.className = 'product';
        productElement.innerHTML = `
            <img src="${product.imageUrl}" alt="${product.name}">
            <span>${product.name} - $${product.price}</span>
            <button onclick="deleteProduct('${product._id}')">Delete</button>
        `;
        productList.appendChild(productElement);
    }

    window.deleteProduct = async function(id) {
        const response = await fetch(`/api/products/${id}`, {
            method: 'DELETE'
        });

        const result = await response.json();
        if (result.success) {
            productList.innerHTML = '';
            loadProducts();
        }
    }

    loadProducts();
});

document.addEventListener('DOMContentLoaded', () => {
    const mostrarInicioSesionBtn = document.getElementById('mostrarInicioSesion');
    const mostrarRegistroBtn = document.getElementById('mostrarRegistro');

    const cardInicioSesion = document.getElementById('cardInicioSesion');
    const cardRegistro = document.getElementById('cardRegistro');

    mostrarInicioSesionBtn.onclick = function() {
        cardInicioSesion.style.display = 'block';
        cardRegistro.style.display = 'none';
    }

    mostrarRegistroBtn.onclick = function() {
        cardRegistro.style.display = 'block';
        cardInicioSesion.style.display = 'none';
    }

    // Mostrar el inicio de sesión por defecto
    cardInicioSesion.style.display = 'block';

    const formularioRegistro = document.getElementById('formularioRegistro');

    formularioRegistro.addEventListener('submit', function(event) {
        event.preventDefault();

        const nombre = document.getElementById('nombreRegistro').value;
        const correo = document.getElementById('correoRegistro').value;
        const contrasena = document.getElementById('contrasenaRegistro').value;

        // Validaciones adicionales si es necesario

        // Enviar solicitud POST al backend para enviar el correo
        fetch('http://localhost:3000/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: nombre,
                email: correo,
                password: contrasena // Puedes omitir esto si no es necesario para el correo
            })
        })
        .then(response => response.text())
        .then(data => {
            console.log(data);
            alert('Correo de validación enviado. Por favor, revisa tu bandeja de entrada.');
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Hubo un error al enviar el correo de validación.');
        });
    });
});
