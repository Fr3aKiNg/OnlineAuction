const db = require('../utils/db');
const config = require('../config/default.json');

module.exports = {
    all: _ => db.load('select * from products'),

    single: id => db.load(`select p.product_id, p.name, 
    us.username as seller_name, (sum(es.value) * 100 / count(*)) as rate_seller, 
    uw.username as winner_name, (sum(ew.value) * 100 / count(*)) as rate_winner,
    p.posted_time, p.end_time
    from products p, users us, users uw, evaluates es, evaluates ew
    where p.product_id = ${id} and p.winner_id = uw.user_id and p.seller_id = us.user_id and es.tar_user_id = us.user_id and ew.tar_user_id = uw.user_id
    group by p.product_id, p.name, us.username, uw.username, p.posted_time, p.end_time;`),

    offers: id => db.load(`select o._time, u.username, o.money from offers o, users u where o.user_id = o.user_id and o.product_id = ${id}`),

    allByCat: catId => db.load(`select * from products where category_id = ${catId}`),

    countByCat: async catId => {
        const rows = await db.load(`select count(*) as total from products where category_id = ${catId}`)
        return rows[0].total;
    },
    pageByCat: (catId, offset) => db.load(`select * from products where category_id = ${catId} limit ${config.pagination.limit} offset ${offset}`),
    getHighestPrice: _ => db.load('SELECT * FROM products WHERE end_time > CURRENT_TIMESTAMP() ORDER BY offer_price LIMIT 5'),
    getAlmostEndTime: _ => db.load('SELECT * FROM products WHERE end_time > CURRENT_TIMESTAMP() ORDER BY end_time LIMIT 5;'),
    getTopBiddingTurn: _ => db.load('SELECT * FROM products p WHERE end_time > CURRENT_TIMESTAMP() ORDER BY (select count(*) from offers o where p.product_id = o.product_id) DESC  LIMIT 5;'),
};