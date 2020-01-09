const express = require('express');
const config = require('../config/default.json');
const watchListModel = require('../models/watch_list.model')

const router = express.Router();


const restrict = require('../middlewares/auth.mdw');
router.get('/', restrict, async function(req, res) {
    console.log(req.session.authUser);
    watchPro = await watchListModel.loadByUserId(req.session.authUser.user_id);
    console.log(watchPro);
    res.render('viewProduct/watchlist', {});
})

module.exports = router;