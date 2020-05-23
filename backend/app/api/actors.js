const {
    ValidationError
} = require('../class/Error');
const Actor = require('../models/Actor');

module.exports = {
    async getAll() {
        return Actor.getAll();
    },

    async getList() {
        return Actor.getList();
    },

    async getById({
        actor_id
    }) {
        if (!actor_id || typeof actor_id !== 'number') throw new ValidationError('actor_id');
        return Actor.getById(actor_id);
    },

    async create({
        firstname, lastname, middlename, rank, experience
    }) {
        if (!firstname || typeof firstname !== 'string' || firstname.trim() == '') throw new ValidationError('firstname');
        if (!lastname || typeof lastname !== 'string' || lastname.trim() == '') throw new ValidationError('lastname');
        if (!middlename || typeof middlename !== 'string' || middlename.trim() == '') throw new ValidationError('middlename');
        if (!rank || typeof rank !== 'string') throw new ValidationError('rank');
        if (!experience || typeof experience !== 'number') throw new ValidationError('experience');

        return Actor.create(firstname, lastname, middlename, rank, experience);
    },

    async remove({
        actor_id
    }) {
        if (!actor_id || typeof actor_id !== 'number') throw new ValidationError('actor_id');
        return Actor.remove(actor_id);
    }
}