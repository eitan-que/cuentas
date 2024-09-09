const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

router.get('/', (req, res) => {
    fs.readFile(path.join(__dirname, '../data', 'cuentas.csv'), 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer los datos:', err);
            res.status(500).send('Error al leer los datos');
        } else {
            const rows = data.split('\n').filter(row => row.trim() !== '');
            const cuentas = rows.map(row => {
                const [fecha, hora, monto, razon, gastoSumaSelector] = row.split(',');
                return { fecha, hora, monto, razon, gastoSumaSelector };
            });
            res.json(cuentas);
        }
    });
});

module.exports = router;