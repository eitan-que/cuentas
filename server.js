const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Ruta principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ruta para el formulario
app.get('/formulario', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'formulario', 'index.html'));
});

// Ruta para el informe
app.get('/informe', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'informe', 'index.html'));
});

// Importar y usar las rutas de la API
const submitForm = require('./api/submitForm');
const getCuentas = require('./api/getCuentas');

app.use('/api/submit-form', submitForm);
app.use('/api/get-cuentas', getCuentas);

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});