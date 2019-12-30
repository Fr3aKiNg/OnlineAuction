const express = require('express');
const categoryModel = require('../models/category.model');

const router = express.Router();


router.get('/', async function(req, res) {
<<<<<<< HEAD
=======

>>>>>>> e5992815b8350ca45f9d8b64191ff057bad44207
    var categories = await categoryModel.allWithSubCat();

    res.render('../views/viewProduct/topFiveTemplate', {
        lcCategories: categories
    });
})


module.exports = router;