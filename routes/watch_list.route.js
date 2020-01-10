const express = require('express');
const moment = require('moment')
const numeral = require('numeral')

const config = require('../config/default.json');
const watchListModel = require('../models/watch_list.model')

const router = express.Router();

const restrict = require('../middlewares/auth.mdw');
router.get('/', restrict, async function(req, res) {
    products = await watchListModel.loadByUserId(req.session.authUser.user_id);
    
    for (var i in products) {
        products[i].offer_price = numeral(products[i].offer_price).format('0,0');
        products[i].isNew = (Date.now() - products[i].posted_time.valueOf()) / 1000 / 60 < 60;
        products[i].isEndSoon = (products[i].end_time - Date.now()) / 1000 / 60 / 60 / 24 < 7;
        if (products[i].isEndSoon)
            products[i].end_time = moment(products[i].end_time).fromNow();
        else
            products[i].end_time = moment(products[i].end_time).format('LLL');
    }

    res.render('viewProduct/watchlist', {
        searchItem: products
    });
})

module.exports = router;