const db = require('../components/db');

module.exports = {
    create: async (play_id, date) => {
        let res = await db.query(`
            insert into shows (
                play_id,
                date
            ) values (
                $1, to_timestamp($2)
            ) returning show_id
        `, [
            play_id,
            date
        ]);
        if (res.rows && res.rows[0] && (res = res.rows[0])) return res.show_id;
        else return null;
    },

    getById: async (show_id) => {
        let show = (await db.query(`select * from shows where show_id = $1 limit 1`, [show_id])).rows[0];
        return show;
    },

    getAll: async () => {
        let result = (await db.query(`
            select
                show_id,
                name,
                extract(epoch from date) as date
            from shows
            join plays using(play_id)
            where show_id > 0
            order by
                show_id desc
        `)).rows;
        return result;
    },

    getList: async () => {
        let result = (await db.query(`
            select
                show_id,
                name
            from shows
            join plays using(play_id)
            where
                show_id > 0
            order by
                show_id desc
        `)).rows;
        return result;
    },

    update: async (show_id, play_id, date) => {
        let res = await db.query(`
            update shows set
                play_id = $2,
                date = $3
            where
                show_id = $1
            returning show_id
        `, [
            show_id,
            play_id,
            date
        ]);
        if (res.rows && res.rows[0] && (res = res.rows[0])) return res.show_id;
        else return null;
    },

    remove: async (show_id) => {
        await db.query(`delete from shows where show_id = $1`, [show_id]);
    }
};