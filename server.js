const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const crypto = require('crypto');

const secret = crypto.randomBytes(64).toString('hex');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
    secret: secret,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === 'production' }
}));

const registerUser = require('./api/registerUser');
const loginUser = require('./api/loginUser');
const submitForm = require('./api/submitForm');
const getCuentas = require('./api/getCuentas');
const deleteItem = require('./api/deleteItem');
const sessionRoutes = require('./api/session'); // Importa las rutas de sesión

app.use('/api/register', registerUser);
app.use('/api/login', loginUser);
app.use('/api/submit-form', submitForm);
app.use('/api/get-cuentas', getCuentas);
app.use('/api/delete-item', deleteItem);
app.use('/api', sessionRoutes); // Usa las rutas de sesión

app.get('/formulario', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'formulario', 'index.html'));
});

app.get('/informe', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'informe', 'index.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'register', 'index.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login', 'index.html'));
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});