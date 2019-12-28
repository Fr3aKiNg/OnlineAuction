const express = require('express');
const categoryModel = require('../models/category.model');

const router = express.Router();


router.get('/', async function(req, res) {
    var categories = await categoryModel.allWithSubCat();

    res.render('../views/viewProduct/topFiveTemplate', {
        lcCategories: categories
    });
})


module.exports = router;