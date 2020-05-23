const db = require('../components/db');

module.exports = {
    create: async (actor_id, role_id) => {
        let res = await db.query(`
            insert into actors_in_contracts(
                actor_id,
                role_id
            ) values (
                $1, $2
            )
        `, [
            actor_id, role_id
        ]);
        if (res.rows && res.rows[0] && (res = res.rows[0])) return res;
        else return null;
    },

    getAll: async () => {
        let result = (await db.query(`
            select
                actors_in_contracts.*,
                concat(firstname, ' ', lastname) as actor,
                plays.name,
                extract(epoch from shows.date) as date,
                roles.salary,
                roles.title as role
            from actors_in_contracts
            join actors using(actor_id)
            join roles using(role_id)
            join shows using(show_id)
            join plays using(play_id)
            order by
                shows.date desc
        `)).rows;
        return result;
    },

    remove: async (actor_id, role_id) => {
        await db.query(`delete from actors_in_contracts where actor_id = $1 and role_id = $2`, [actor_id, role_id]);
    }
};