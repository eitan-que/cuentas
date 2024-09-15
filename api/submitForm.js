const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const isAuthenticated = require('../middleware/isAuthenticated');

router.post('/', isAuthenticated, (req, res) => {
    const { razon, monto, gastoSumaSelector } = req.body;
    const fecha = new Date().toLocaleDateString();
    const hora = new Date().toLocaleTimeString();
    const newLine = `${fecha},${hora},${monto},${razon},${gastoSumaSelector}\n`;

    const userId = req.session.userId;
    const userDir = path.join(__dirname, '..', 'data', 'users', userId);
    const csvFilePath = path.join(userDir, 'data.csv');

    fs.appendFile(csvFilePath, newLine, (err) => {
        if (err) {
            console.error('Error al guardar los datos:', err);
            res.status(500).send('Error al guardar los datos');
        } else {
            res.redirect('/informe');
        }
    });
});

module.exports = router;