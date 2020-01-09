const db = require('../utils/db');

module.exports = {
  add: entity => db.add(entity, 'watch_list'),

  loadByUserId: async user_id => {
    const rows = await db.load(`select * from watch_list where user_id = '${user_id}'`);
    return rows;
  }
};
