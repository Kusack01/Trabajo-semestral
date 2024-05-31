require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configuración de nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
});

// Ruta para manejar el envío de correos electrónicos
app.post('/send-email', (req, res) => {
    const { email, name } = req.body;

    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Correo de Validación',
        text: `Hola ${name},\n\nPor favor valida tu correo electrónico haciendo clic en el siguiente enlace: \n\nhttp://tusitio.com/validar?email=${email}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200).send('Correo enviado correctamente');
    });
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});

app.post('/logout', (req, res) => {
    // Aquí asume que estás usando express-session para manejar sesiones
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Error al cerrar sesión');
        }
        res.status(200).send('Cerró sesión correctamente');
    });
});

