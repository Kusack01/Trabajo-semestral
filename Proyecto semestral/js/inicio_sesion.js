const express = require('express');
const app = express();

// Ejemplo en un arreglo
const datos = [
  { id: 1, email: 'mr.8413488@gmail.com', password: 'ctmenfermo01' },
  { id: 2, email: 'ma.reyesv@duocuc.cl', password: 'alvprimo' },
  { id: 3, email: 'mauricio.reyes.velasco.01@gmail.com', password: 'elcielosecae' }
];

// Ruta para obtener los datos
app.get('/api/datos', (req, res) => {
  res.json(datos);
});

// Ruta para obtener dato por ID
app.get('/api/datos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const dato = datos.find(d => d.id == id);
  if (!dato) return res.status(404).send('Dato no encontrado');
  res.json(dato);
});

// Puerto del servidor
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Servidor corriendo en el puerto ${port}`));