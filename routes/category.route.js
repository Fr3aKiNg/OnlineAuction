const express = require('express');
const categoryModel = require('../models/category.model');

const router = express.Router();


router.get('/', async function(req, res) {
<<<<<<< HEAD

=======
    console.log('categories');
>>>>>>> eb01852... Category almost done hahaha
    var categories = await categoryModel.allWithSubCat();

    res.render('../views/viewProduct/topFiveTemplate', {
        lcCategories: categories
    });
})


module.exports = router;