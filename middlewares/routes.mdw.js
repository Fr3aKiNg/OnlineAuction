const categoryModel = require('../models/category.model');
<<<<<<< HEAD
const productModel = require('../models/product.model');
=======
>>>>>>> eb01852... Category almost done hahaha

module.exports = function(app) {
    app.get('/', async function(req, res) {
        // res.send('hello expressjs');
        var categories = await categoryModel.allWithSubCat();
<<<<<<< HEAD
<<<<<<< HEAD
        //var product = await productModel.
            // console.log(JSON.stringify(categories));
=======
        // console.log(JSON.stringify(categories));
>>>>>>> 4f8dcc6... category done/menu done mfk
        res.render('home', {
            lcCategories: categories
        });
        // res.render('../viewProduct/topFiveTemplate');
=======
        res.render('home', {
            lcCategories: categories
        });
>>>>>>> eb01852... Category almost done hahaha
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