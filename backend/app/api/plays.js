const {
    ValidationError
} = require('../class/Error');
const Play = require('../models/Play');

module.exports = {
    async getAll() {
        return Play.getAll();
    },

    async getList() {
        return Play.getList();
    },

    async getById({
        play_id
    }) {
        if (!play_id || typeof play_id !== 'number') throw new ValidationError('play_id');
        return Play.getById(play_id);
    },

    async create({
        name,
        budget
    }) {
        if (!name || typeof name !== 'string' || name.trim() == '') throw new ValidationError('name');
        if (!budget || typeof budget !== 'number') throw new ValidationError('budget');

        return Play.create(name, budget);
    },

    async remove({
        play_id
    }) {
        if (!play_id || typeof play_id !== 'number') throw new ValidationError('play_id');
        return Play.remove(play_id);
    },
}