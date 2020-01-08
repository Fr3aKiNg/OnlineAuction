const express = require('express');
const productModel = require('../models/product.model');
const config = require('../config/default.json');

const router = express.Router();


router.get('/:id', async function(req, res) {
    const row = await productModel.single(req.params.id);
    const offers = await productModel.offers(req.params.id);
    res.render('viewProduct/product', {
        product: row,
        offer: offers
    })
})

module.exports = router;