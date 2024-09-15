const fs = require('fs');
const path = require('path');
const express = require('express');
const bcrypt = require('bcrypt');
const uuid = require('uuid');

const router = express.Router();

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isPasswordStrong(password) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChars;
}

router.post('/', async (req, res) => {
    const { email, password, repeatPassword } = req.body;

    // Verificar la longitud de la contraseña
    if (password.length < 8) {
        return res.status(400).json({ error: 'Password must be at least 8 characters long' });
    }

    // Verificar que las contraseñas coincidan
    if (password !== repeatPassword) {
        return res.status(400).json({ error: 'Passwords do not match' });
    }

    // Verificar la fortaleza de la contraseña
    if (!isPasswordStrong(password)) {
        return res.status(400).json({ error: 'Password must include uppercase, lowercase, numbers, and special characters' });
    }

    // Verificar el formato del email
    if (!isValidEmail(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }

    // Leer todos los usuarios existentes
    const usersDir = path.join(__dirname, '..', 'data', 'users');
    const userFiles = fs.readdirSync(usersDir);
    for (const file of userFiles) {
        const filePath = path.join(usersDir, file);
        if (fs.lstatSync(filePath).isFile()) {
            const user = JSON.parse(fs.readFileSync(filePath));
            if (user.email === email) {
                return res.status(400).json({ error: 'Email already in use' });
            }
        }
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = uuid.v4();
    const user = { email, password: hashedPassword, uuid: userId };
    const userDir = path.join(usersDir, userId);

    fs.mkdirSync(userDir, { recursive: true });
    fs.writeFileSync(path.join(userDir, `${userId}.json`), JSON.stringify(user));
    fs.writeFileSync(path.join(userDir, 'data.csv'), ''); // Crear el archivo CSV

    req.session.userId = userId;
    res.status(200).json({ message: 'User registered successfully' });
});

module.exports = router;