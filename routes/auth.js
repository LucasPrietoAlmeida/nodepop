const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/login', (req, res) => {
    res.render('login', { error: null });
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.render('login', { error: 'Usuario no encontrado' });

        const valid = await user.comparePassword(password);
        if (!valid) return res.render('login', { error: 'Contraseña incorrecta' });

        req.session.userId = user._id;
        req.session.email = user.email;
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.render('login', { error: 'Error interno' });
    }
});

router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
});

module.exports = router;
