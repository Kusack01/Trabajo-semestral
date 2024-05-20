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