const {
    ValidationError
} = require('../class/Error');
const Work = require('../models/Work');

module.exports = {
    async getAll() {
        return Work.getAll();
    },

    async getList() {
        return Work.getList();
    },

    async getById({
        work_id
    }) {
        if (!work_id || typeof work_id !== 'number') throw new ValidationError('work_id');
        return Work.getById(work_id);
    },

    async create({
        actor_id,
        role_id
    }) {
        if (!actor_id || typeof actor_id !== 'number') throw new ValidationError('actor_id');
        if (!role_id || typeof role_id !== 'number') throw new ValidationError('role_id');

        return Work.create(actor_id, role_id);
    },

    async remove({
        actor_id, role_id
    }) {
        if (!actor_id || typeof actor_id !== 'number') throw new ValidationError('actor_id');
        if (!role_id || typeof role_id !== 'number') throw new ValidationError('role_id');
        
        return Work.remove(actor_id, role_id);
    },
}