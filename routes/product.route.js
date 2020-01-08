const express = require('express');
const productModel = require('../models/product.model');
const config = require('../config/default.json');

const router = express.Router();


router.get('/:id', async function(req, res) {
    const row = await productModel.single(req.params.id);
    console.log(JSON.stringify(row));
    res.render('viewProduct/product', {
        product: row
    })
})

module.exports = router;