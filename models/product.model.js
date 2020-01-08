const db = require('../utils/db');
const config = require('../config/default.json');

module.exports = {
    all: _ => db.load('select * from products'),

    offers: id => db.load(`select o._time, u.username, o.money from offers o, users u where o.user_id = o.user_id and o.product_id = ${id}`),

    allByCat: catId => db.load(`select * from products where category_id = ${catId}`),

    countByCat: async catId => {
        const rows = await db.load(`select count(*) as total from products where category_id = ${catId}`)
        return rows[0].total;
    },
    pageByCat: (catId, offset) => db.load(`select * from products where category_id = ${catId} limit ${config.pagination.limit} offset ${offset}`),

    getHighestPrice: _ => db.load('SELECT p.product_id as product_id, p.name as name, \
    u.username AS winner_username, p.offer_price AS offer_price, p.end_time AS end_time, COUNT(*) AS count_offers\
    FROM products p, users u, offers o\
    WHERE o.product_id = p.product_id AND end_time > CURRENT_TIMESTAMP()\
    GROUP BY p.product_id, p.name, u.username, p.offer_price, p.end_time\
    ORDER BY p.offer_price\
    LIMIT 5;'),

    getAlmostEndTime: _ => db.load('SELECT p.product_id as product_id, p.name as name, \
    u.username AS winner_username, p.offer_price AS offer_price, p.end_time AS end_time, COUNT(*) AS count_offers\
    FROM products p, users u, offers o\
    WHERE o.product_id = p.product_id AND end_time > CURRENT_TIMESTAMP()\
    GROUP BY p.product_id, p.name, u.username, p.offer_price, p.end_time\
    ORDER BY p.end_time\
    LIMIT 5;'),

    getTopBiddingTurn: _ => db.load('SELECT p.product_id as product_id, p.name as name, \
    u.username AS winner_username, p.offer_price AS offer_price, p.end_time AS end_time, COUNT(*) AS count_offers\
    FROM products p, users u, offers o\
    WHERE o.product_id = p.product_id AND end_time > CURRENT_TIMESTAMP()\
    GROUP BY p.product_id, p.name, u.username, p.offer_price, p.end_time\
    ORDER BY (select count(*) from offers o where p.product_id = o.product_id) DESC  LIMIT 5;'),
};

module.exports.single = function(id) {
    p = db.load(`select p.product_id, p.name, 
    us.username as seller_name,
    uw.username as winner_name,
    p.posted_time, p.end_time
    from products p, users us, users uw
    where p.product_id = ${id} and p.winner_id = uw.user_id and p.seller_id = us.user_id;
    `);

    p.rate_seller = db.load(`select (sum(e.value) * 100 / count(*)) as rate_seller from evaluates e WHERE e.tar_user_id = ${p.seller_id};`);
    p.rate_winner = db.load(`select (sum(e.value) * 100 / count(*)) as rate_seller from evaluates e WHERE e.tar_user_id = ${p.winner_id};`);

    return p;
};