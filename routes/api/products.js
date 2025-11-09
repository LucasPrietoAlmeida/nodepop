const express = require('express');
const router = express.Router();
const Product = require('../../models/Product');
const requireLogin = require('../../middleware/auth');

router.get('/', requireLogin, async (req, res, next) => {
    try {
        const { tag, min, max, name, skip = 0, limit = 5, sort = 'name' } = req.query;
        const filter = { owner: req.session.email };

        if (tag) filter.tags = tag;
        if (name) filter.name = new RegExp('^' + name, 'i');
        if (min || max) filter.price = {};
        if (min) filter.price.$gte = parseFloat(min);
        if (max) filter.price.$lte = parseFloat(max);

        const total = await Product.countDocuments(filter);
        const products = await Product.find(filter)
        .skip(parseInt(skip))
        .limit(parseInt(limit))
        .sort(sort);

        const nextSkip = parseInt(skip) + parseInt(limit);
        const prevSkip = parseInt(skip) - parseInt(limit);

        res.render('index', {
        title: 'Nodepop',
        products,
        total,
        limit: parseInt(limit),
        skip: parseInt(skip),
        nextSkip: nextSkip < total ? nextSkip : null,
        prevSkip: prevSkip >= 0 ? prevSkip : null,
        query: req.query
        });
    } catch (err) {
        next(err);
    }
});


router.post('/', requireLogin, async (req, res, next) => {
    try {
        const { name, price, tags } = req.body;
        const tagsArray = tags ? tags.split(',').map(t => t.trim()) : [];

        const product = new Product({
        name,
        owner: req.session.email, 
        price: parseFloat(price),
        tags: tagsArray
        });

        await product.save();
        res.redirect('/');
    } catch (err) {
        next(err);
    }
});

router.post('/delete/:id', requireLogin, async (req, res, next) => {
    try {
        await Product.deleteOne({
        _id: req.params.id,
        owner: req.session.email 
        });
        res.redirect('/');
    } catch (err) {
        next(err);
    }
});

module.exports = router;
