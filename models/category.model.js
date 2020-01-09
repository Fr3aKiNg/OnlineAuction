const db = require('../utils/db');
module.exports = {
    all: _ => db.load('select * from categories'),
    
    allWithSubCat: async function() {
        cats = await db.load('select * from categories where cat_root is null');
        // console.log(JSON.stringify(cats));

        var catReturn = [];
        // Object.keys(cats).forEach(async function(key) {

        //     cats[key].subCats = await db.load(`select * from categories where cat_root = ${cats[key].cat_id}`);
        //     cats[key].CatHaveSub = (cats[key].subCats.length > 0);
        //     console.log(key, cats[key].CatHaveSub);
        //     catReturn.push(cats[key]);
        //     console.log(cats[key]);
        //     console.log(catReturn);

        // });

        for (var key in cats) {
            cats[key].subCats = await db.load(`select * from categories where cat_root = ${cats[key].cat_id}`);
            cats[key].CatHaveSub = (cats[key].subCats.length > 0);
            // console.log(key, cats[key].CatHaveSub);
            catReturn.push(cats[key]);
            // console.log(cats[key]);
            // console.log(catReturn);
        }
        // console.log(catReturn);

        return catReturn;
    },

    single: async id => {
        const sql = `select * from categories where cat_id = ${id}`;
        const rows = await db.load(sql);
        if (rows.length === 0)
            return null;

        return rows[0];
    },

    add: entity => db.add(entity, 'categories'),
    del: id => db.del({ CatID: id }, 'categories'),
    patch: entity => {
        const condition = { CatID: entity.CatID };
        delete entity.CatID;
        return db.patch(entity, condition, 'categories');
    }
};