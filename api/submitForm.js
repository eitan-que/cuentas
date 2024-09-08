const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

router.post('/', (req, res) => {
    const { razon, monto } = req.body;
    const fecha = new Date().toLocaleDateString();
    const hora = new Date().toLocaleTimeString();
    const newLine = `${fecha},${hora},${monto},${razon}\n`;

    fs.appendFile(path.join(__dirname, '../data', 'cuentas.csv'), newLine, (err) => {
        if (err) {
            console.error('Error al guardar los datos:', err);
            res.status(500).send('Error al guardar los datos');
        } else {
            res.redirect('/informe');
        }
    });
});

module.exports = router;