const express = require('express');
const categoryModel = require('../models/category.model');

const router = express.Router();


router.get('/', async function(req, res) {
    console.log('categories');
    var categories = await categoryModel.allWithSubCat();

    res.render('../views/viewProduct/topFiveTemplate', {
        lcCategories: categories
    });
})


module.exports = router;