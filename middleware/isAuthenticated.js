module.exports = (req, res, next) => {
    console.log('Checking authentication:', req.session);
    if (req.session && req.session.userId) {
        return next();
    } else {
        res.redirect('/login');
    }
};
