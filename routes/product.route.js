const express = require('express');
const productModel = require('../models/product.model');
const config = require('../config/default.json');

const router = express.Router();


router.get('/:id', async function(req, res) {
    const rows = await productModel.single(req.params.id);
    console.log(JSON.stringify(rows[0]));
    res.render('viewProduct/product', {
        product: rows[0]
    })
})

module.exports = router;