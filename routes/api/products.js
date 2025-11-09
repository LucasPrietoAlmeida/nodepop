const express = require('express');
const router = express.Router();
const Product = require('../../models/Product');

// GET 
router.get('/', async (req, res, next) => {
    try {
        const { tag, min, max, name, skip = 0, limit = 10, sort = 'name' } = req.query;
        const filter = {};

        if (tag) filter.tags = tag;
        if (name) filter.name = new RegExp('^' + name, 'i');
        if (min || max) filter.price = {};
        if (min) filter.price.$gte = parseFloat(min);
        if (max) filter.price.$lte = parseFloat(max);

        const products = await Product.find(filter)
        .skip(parseInt(skip))
        .limit(parseInt(limit))
        .sort(sort);

        res.render('index', { title: 'Nodepop', products });
    } catch (err) {
        next(err);
    }
});

// POST 
router.post('/', async (req, res, next) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.redirect('/');
    } catch (err) {
        next(err);
    }
});

// POST 
router.post('/delete/:id', async (req, res, next) => {
    try {
        const { owner } = req.body;
        await Product.deleteOne({ _id: req.params.id, owner });
        res.redirect('/');
    } catch (err) {
        next(err);
    }
});

module.exports = router;