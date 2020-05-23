const db = require('../components/db');

module.exports = {
    create: async (show_id, title, salary) => {
        let res = await db.query(`
            insert into roles (
                show_id,
                title,
                salary
            ) values (
                $1, $2, $3
            ) returning role_id
        `, [
            show_id,
            title,
            salary
        ]);
        if (res.rows && res.rows[0] && (res = res.rows[0])) return res.role_id;
        else return null;
    },

    getById: async (role_id) => {
        let show = (await db.query(`select * from roles where role_id = $1 limit 1`, [role_id])).rows[0];
        return show;
    },

    getAll: async () => {
        let result = (await db.query(`
            select
                roles.*,
                extract(epoch from shows.date) as date,
                plays.name
            from roles
            join shows using(show_id)
            join plays using(play_id)
            where role_id > 0
            order by
                role_id desc
        `)).rows;
        return result;
    },

    getList: async () => {
        let result = (await db.query(`
            select
                roles.role_id,
                concat(roles.title, ' в ', plays.name) as role,
                extract(epoch from shows.date) as date
            from roles
            join shows using(show_id)
            join plays using(play_id)
            where
                role_id > 0
            order by
                role_id desc
        `)).rows;
        return result;
    },

    update: async (role_id, show_id, title, salary) => {
        let res = await db.query(`
            update roles set
                show_id = $2,
                title = $3,
                salary = $4
            where
                role_id = $1
            returning role_id
        `, [
            role_id,
            show_id,
            title,
            salary
        ]);
        if (res.rows && res.rows[0] && (res = res.rows[0])) return res.role_id;
        else return null;
    },

    remove: async (role_id) => {
        await db.query(`delete from roles where role_id = $1`, [role_id]);
    }
};