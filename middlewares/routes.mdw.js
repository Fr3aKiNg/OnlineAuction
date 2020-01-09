const categoryModel = require('../models/category.model');
const productModel = require('../models/product.model');
const config = require('../config/default.json');

const moment = require('moment')
const numeral = require('numeral')


module.exports = function(app) {
    app.get('/', async function(req, res) {
        // res.send('hello expressjs');
        var categories = await categoryModel.allWithSubCat();

        var LeastTimeRemain = await productModel.getAlmostEndTime();
        var HighestPrice = await productModel.getHighestPrice();
        var BiddingTurn = await productModel.getTopBiddingTurn();

        for (var i in LeastTimeRemain) {
            LeastTimeRemain[i].offer_price = numeral(LeastTimeRemain[i].offer_price).format('0,0');
            LeastTimeRemain[i].isNew = (Date.now() - LeastTimeRemain[i].posted_time.valueOf()) / 1000 / 60 < 60;
            LeastTimeRemain[i].isEndSoon = (LeastTimeRemain[i].end_time - Date.now()) / 1000 / 60 / 60 / 24 < 7;
            if (LeastTimeRemain[i].isEndSoon)
                LeastTimeRemain[i].end_time = moment(LeastTimeRemain[i].end_time).fromNow();
            else
                LeastTimeRemain[i].end_time = moment(LeastTimeRemain[i].end_time).format('LLL');
        }

        for (var i in HighestPrice) {
            HighestPrice[i].offer_price = numeral(HighestPrice[i].offer_price).format('0,0');
            HighestPrice[i].isNew = (Date.now() - HighestPrice[i].posted_time.valueOf()) / 1000 / 60 < 60;

            HighestPrice[i].isEndSoon = (HighestPrice[i].end_time - Date.now()) / 1000 / 60 / 60 / 24 < 7;
            if (HighestPrice[i].isEndSoon)
                HighestPrice[i].end_time = moment(HighestPrice[i].end_time).fromNow();
            else
                HighestPrice[i].end_time = moment(HighestPrice[i].end_time).format('LLL');
        }

        for (var i in BiddingTurn) {
            BiddingTurn[i].offer_price = numeral(BiddingTurn[i].offer_price).format('0,0');
            BiddingTurn[i].isNew = (Date.now() - BiddingTurn[i].posted_time.valueOf()) / 1000 / 60 < 60;

            BiddingTurn[i].isEndSoon = (BiddingTurn[i].end_time - Date.now()) / 1000 / 60 / 60 / 24 < 7;
            if (BiddingTurn[i].isEndSoon)
                BiddingTurn[i].end_time = moment(BiddingTurn[i].end_time).fromNow();
            else
                BiddingTurn[i].end_time = moment(BiddingTurn[i].end_time).format('LLL');
        }

        res.render('home', {
            lcCategories: categories,
            topLeastTimeRemain: LeastTimeRemain,
            topHighestPrice: HighestPrice,
            topBiddingProduct: BiddingTurn
        });
        // res.render('../viewProduct/topFiveTemplate');
    })

    app.get('/about', function(req, res) {
        res.render('about');
    })

    app.get('/search', async function(req, res) {
        // res.send('hello expressjs');
        var categories = await categoryModel.allWithSubCat();
        if (req.query.page === undefined)
            req.query.page = 1;
        if (req.query.searchString === undefined)
            req.query.searchString = '';

        var products = await productModel.pageByCatAndSearchString(req.query.catID, (req.query.page - 1) * config.pagination.limit, req.query.searchString);

        for (var i in products) {
            products[i].offer_price = numeral(products[i].offer_price).format('0,0');
            products[i].isNew = (Date.now() - products[i].posted_time.valueOf()) / 1000 / 60 < 60;
            products[i].isEndSoon = (products[i].end_time - Date.now()) / 1000 / 60 / 60 / 24 < 7;
            if (products[i].isEndSoon)
                products[i].end_time = moment(products[i].end_time).fromNow();
            else
                products[i].end_time = moment(products[i].end_time).format('LLL');
        }

        var numProduct = await productModel.countByCatAndSearchString(req.query.catID, req.query.searchString);
        var numPage = Math.ceil(numProduct / config.pagination.limit);

        const page_items = [];
        for (i = 1; i <= numPage; i++) {
            const item = {
                value: i,
                isActive: i == req.query.page
            }
            page_items.push(item);
        }

        if (req.query.catID !== undefined && req.query.catID.length !== 0)
            var cats = await categoryModel.single(req.query.catID);


        res.render('search', {
            lcCategories: categories,
            searchItem: products,
            searchName: req.query.searchString,
            catID: req.query.catID,
            curPage: req.query.page,
            page_items: page_items,
            catName: cats

        });
        // res.render('../viewProduct/topFiveTemplate');
    })

    app.get('/bs', function(req, res) {
        // res.sendFile(__dirname + '/bs.html');
        res.render('bs', {
            layout: false
        });
    })

    app.use('/account', require('../routes/_account.route'));
    app.use('/categories', require('../routes/category.route'));
    app.use('/product', require('../routes/product.route'));
};