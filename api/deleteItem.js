const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const isAuthenticated = require('../middleware/isAuthenticated');

router.delete('/:index', isAuthenticated, (req, res) => {
    const userId = req.session.userId;
    const userDir = path.join(__dirname, '..', 'data', 'users', userId);
    const csvFilePath = path.join(userDir, 'data.csv');
    const indexToDelete = parseInt(req.params.index, 10);

    fs.readFile(csvFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer los datos:', err);
            return res.status(500).send('Error al leer los datos');
        }

        const rows = data.split('\n').filter(row => row.trim() !== '');
        if (indexToDelete >= 0 && indexToDelete < rows.length) {
            rows.splice(indexToDelete, 1);
            fs.writeFile(csvFilePath, rows.join('\n') + '\n', (err) => {
                if (err) {
                    console.error('Error al guardar los datos:', err);
                    return res.status(500).send('Error al guardar los datos');
                }
                res.status(200).send('Item eliminado correctamente');
            });
        } else {
            res.status(400).send('Índice inválido');
        }
    });
});

module.exports = router;