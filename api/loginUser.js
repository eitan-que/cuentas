const express = require('express');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');

const router = express.Router();

router.post('/', async (req, res) => {
    const { email, password } = req.body;
    const usersDir = path.join(__dirname, '..', 'data', 'users');
    const userFiles = fs.readdirSync(usersDir);

    for (const userFile of userFiles) {
        const user = JSON.parse(fs.readFileSync(path.join(usersDir, userFile, userFile + '.json')));
        if (user.email === email && await bcrypt.compare(password, user.password)) {
            req.session.userId = user.uuid;
            return res.redirect('/');
        }
    }

    res.redirect('/login');
});

module.exports = router;