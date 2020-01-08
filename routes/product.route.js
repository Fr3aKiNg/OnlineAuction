const express = require('express');
const productModel = require('../models/product.model');
const config = require('../config/default.json');
const moment = require('moment')
const numeral = require('numeral')

const router = express.Router();


router.get('/:id', async function(req, res) {
    const row = await productModel.single(req.params.id);
    row.posted_time = moment(row.posted_time).format('LLL');
    row.end_time = moment(row.end_time).fromNow();
    row.buy_now_price_string = numeral(row.buy_now_price).format('0,0');
    row.price_step_string = numeral(row.price_step).format('0,0');
    row.offer_price_string = numeral(row.offer_price).format('0,0');

    const offers = await productModel.offers(req.params.id);
    for (o in offers) {
        o._time = moment(o._time).format('LLL');
    }
    res.render('viewProduct/product', {
        product: row,
        offer: offers
    })
})

module.exports = router;