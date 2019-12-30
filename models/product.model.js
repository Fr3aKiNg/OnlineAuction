const db = require('../utils/db');
const config = require('../config/default.json');

module.exports = {
    all: _ => db.load('select * from products'),
    single: id => db.load(`select * from products where product = ${id}`),
    allByCat: catId => db.load(`select * from products where category_id = ${catId}`),
    countByCat: async catId => {
        const rows = await db.load(`select count(*) as total from products where category_id = ${catId}`)
        return rows[0].total;
    },
    pageByCat: (catId, offset) => db.load(`select * from products where category_id = ${catId} limit ${config.pagination.limit} offset ${offset}`),
    getHighestPrice: _ => db.load('SELECT * FROM products ORDER BY offer_price LIMIT 5'),
    getAlmostEndTime: _ => db.load('SELECT * FROM products ORDER BY end_time LIMIT 5;'),

};