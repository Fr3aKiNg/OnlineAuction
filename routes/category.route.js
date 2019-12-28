const express = require('express');
const categoryModel = require('../models/category.model');

const router = express.Router();


router.get('/', async function(req, res) {
<<<<<<< HEAD
<<<<<<< HEAD

=======
    console.log('categories');
>>>>>>> eb01852... Category almost done hahaha
=======

>>>>>>> a563e14... update cat
    var categories = await categoryModel.allWithSubCat();

    res.render('../views/viewProduct/topFiveTemplate', {
        lcCategories: categories
    });
})


module.exports = router;