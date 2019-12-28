const categoryModel = require('../models/category.model');
const productModel = require('../models/product.model');

module.exports = function(app) {
    app.get('/', async function(req, res) {
        // res.send('hello expressjs');
        var categories = await categoryModel.allWithSubCat();
        var product = await productModel.
            // console.log(JSON.stringify(categories));
        res.render('home', {
            lcCategories: categories
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