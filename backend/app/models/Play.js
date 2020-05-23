const db = require('../components/db');

module.exports = {
    create: async (name, budget) => {
        let res = await db.query(`
            insert into plays (
                name,
                budget
            ) values (
                $1, $2
            ) returning play_id
        `, [
            name,
            budget
        ]);
        if (res.rows && res.rows[0] && (res = res.rows[0])) return res.play_id;
        else return null;
    },

    getById: async (play_id) => {
        let play = (await db.query(`select * from plays where play_id = $1 limit 1`, [play_id])).rows[0];
        return play;
    },

    getAll: async () => {
        let result = (await db.query(`select * from plays where play_id > 0 order by play_id desc`)).rows;
        return result;
    },

    getList: async () => {
        let result = (await db.query(`select play_id, name from plays where play_id > 0 order by play_id desc`)).rows;
        return result;
    },

    update: async (play_id, name, budget) => {
        let res = await db.query(`
            update plays set
                name = $2,
                budget = $3
            where
                play_id = $1
            returning play_id
        `, [
            play_id,
            name,
            budget
        ]);
        if (res.rows && res.rows[0] && (res = res.rows[0])) return res.play_id;
        else return null;
    },

    remove: async (play_id) => {
        await db.query(`delete from plays where play_id = $1`, [play_id]);
    }
};