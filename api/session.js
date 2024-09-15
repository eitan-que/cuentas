const express = require('express');
const router = express.Router();

router.get('/session', (req, res) => {
    res.json({ isAuthenticated: !!req.session.userId });
});

module.exports = router;