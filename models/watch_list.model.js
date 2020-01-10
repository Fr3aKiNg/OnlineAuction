const db = require('../utils/db');

module.exports = {
  add: entity => db.add(entity, 'watch_list'),

  loadByUserId: async user_id => {
    const rows = await db.load(`SELECT p.product_id as product_id, p.name as name, \
    u.username AS winner_username, p.offer_price AS offer_price, p.end_time AS end_time, p.posted_time AS posted_time, COUNT(*) AS count_offers \
    FROM (products p JOIN users u ON u.user_id = p.winner_id) LEFT JOIN offers o ON o.product_id = p.product_id \
    WHERE end_time > CURRENT_TIMESTAMP() AND p.product_id IN (select product_id from watch_list where user_id = ${user_id})\
    GROUP BY p.product_id, p.name, u.username, p.offer_price, p.end_time, p.posted_time`);
    return rows;
  }
};
