const db = require('../utils/db');
const config = require('../config/default.json');

module.exports = {
    all: _ => db.load('select * from products'),

    offers: id => db.load(`select o._time, u.username, o.money from offers o, users u where o.user_id = o.user_id and o.product_id = ${id}`),

    allByCat: catId => db.load(`select * from products where category_id = ${catId}`),

    getHighestPrice: _ => db.load('SELECT p.product_id as product_id, p.name as name, \
    u.username AS winner_username, p.offer_price AS offer_price, p.end_time AS end_time, p.posted_time AS posted_time, COUNT(*) AS count_offers\
    FROM (products p JOIN users u ON u.user_id = p.winner_id) LEFT JOIN offers o ON o.product_id = p.product_id \
    WHERE end_time > CURRENT_TIMESTAMP() \
    GROUP BY p.product_id, p.name, u.username, p.offer_price, p.end_time, p.posted_time \
    ORDER BY p.offer_price DESC\
    LIMIT 5;'),

    getAlmostEndTime: _ => db.load('SELECT p.product_id as product_id, p.name as name, \
    u.username AS winner_username, p.offer_price AS offer_price, p.end_time AS end_time, p.posted_time AS posted_time, COUNT(*) AS count_offers \
    FROM (products p JOIN users u ON u.user_id = p.winner_id) LEFT JOIN offers o ON o.product_id = p.product_id \
    WHERE end_time > CURRENT_TIMESTAMP() \
    GROUP BY p.product_id, p.name, u.username, p.offer_price, p.end_time, p.posted_time \
    ORDER BY p.end_time \
    LIMIT 5;'),

    getTopBiddingTurn: _ => db.load('SELECT p.product_id as product_id, p.name as name, \
    u.username AS winner_username, p.offer_price AS offer_price, p.end_time AS end_time, p.posted_time AS posted_time, COUNT(*) AS count_offers\
    FROM (products p JOIN users u ON u.user_id = p.winner_id) LEFT JOIN offers o ON o.product_id = p.product_id \
    WHERE end_time > CURRENT_TIMESTAMP() \
    GROUP BY p.product_id, p.name, u.username, p.offer_price, p.end_time, p.posted_time \
    ORDER BY (select count(*) from offers o where p.product_id = o.product_id) DESC  LIMIT 5;'),
};

module.exports.single = async function(id) {
    p = await db.load(`select p.product_id, p.name, 
    us.username as seller_name,
    uw.username as winner_name,
    p.posted_time, p.end_time,
    p.seller_id AS seller_id,
    p.winner_id AS winner_id,
    p.price_step AS price_step,
    p.buy_now_price AS buy_now_price,
    p.offer_price AS offer_price
    from products p, users us, users uw
    where p.product_id = ${id} and p.winner_id = uw.user_id and p.seller_id = us.user_id;
    `);

    p[0].rate_seller = await db.load(`select (sum(e.value) * 100 / count(*)) as rate_seller from evaluates e WHERE e.tar_user_id = ${p[0].seller_id};`);
    p[0].rate_seller = p[0].rate_seller[0].rate_seller;
    if (p[0].rate_seller === null) p[0].rate_seller = 100;

    p[0].rate_winner = await db.load(`select (sum(e.value) * 100 / count(*)) as rate_winner from evaluates e WHERE e.tar_user_id = ${p[0].winner_id};`);
    p[0].rate_winner = p[0].rate_winner[0].rate_winner;
    if (p[0].rate_winner === null) p[0].rate_winner = 100;

    return p[0];
};

module.exports.pageByCatAndSearchString = async function(catId, offset, search_string) {
    if (catId === undefined || catId.length === 0)
        return db.load(`SELECT p.product_id as product_id, p.name as name, \
        u.username AS winner_username, p.offer_price AS offer_price, p.end_time AS end_time, p.posted_time AS posted_time, COUNT(*) AS count_offers \
        FROM (products p JOIN users u ON u.user_id = p.winner_id) LEFT JOIN offers o ON o.product_id = p.product_id \
        WHERE end_time > CURRENT_TIMESTAMP() AND p.name LIKE '%${search_string}%' \
        GROUP BY p.product_id, p.name, u.username, p.offer_price, p.end_time, p.posted_time \
        limit ${config.pagination.limit} offset ${offset}`);

    return db.load(`SELECT p.product_id as product_id, p.name as name, \
    u.username AS winner_username, p.offer_price AS offer_price, p.end_time AS end_time, p.posted_time AS posted_time, COUNT(*) AS count_offers \
    FROM (products p JOIN users u ON u.user_id = p.winner_id) LEFT JOIN offers o ON o.product_id = p.product_id \
    WHERE end_time > CURRENT_TIMESTAMP() AND p.name LIKE '%${search_string}%' AND category_id = ${catId} \
    GROUP BY p.product_id, p.name, u.username, p.offer_price, p.end_time, p.posted_time \
    limit ${config.pagination.limit} offset ${offset}`);
};

module.exports.countByCatAndSearchString = async function(catId, search_string) {
    if (catId === undefined || catId.length === 0)
        var rows = await db.load(`SELECT count(*) AS total
            FROM products p
            WHERE end_time > CURRENT_TIMESTAMP() AND p.name LIKE '%${search_string}%'`);
    else
        var rows = await db.load(`SELECT count(*) AS total
            FROM products p
            WHERE end_time > CURRENT_TIMESTAMP() AND p.name LIKE '%${search_string}%' AND category_id = ${catId}`);

    return rows[0].total;
};