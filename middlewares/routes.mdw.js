const categoryModel = require('../models/category.model');

const productModel = require('../models/product.model');



module.exports = function(app) {
    app.get('/', async function(req, res) {
        // res.send('hello expressjs');
        var categories = await categoryModel.allWithSubCat();

        var products = await productModel.getAlmostEndTime();

        console.log(JSON.stringify(products));

        res.render('home', {
            lcCategories: categories,
            topLeastTimeRemain: products
        });
        // res.render('../viewProduct/topFiveTemplate');
    })

    app.get('/about', function(req, res) {
        res.render('about');
    })
    app.get('/bs', function(req, res) {
        // res.sendFile(__dirname + '/bs.html');
        res.render('bs', {
            layout: false
        });
    })

    app.use('/categories', require('../routes/category.route'));
};