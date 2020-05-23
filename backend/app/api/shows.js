const {
    ValidationError
} = require('../class/Error');
const Show = require('../models/Show');

module.exports = {
    async getAll() {
        return Show.getAll();
    },

    async getList() {
        return Show.getList();
    },

    async getById({
        show_id
    }) {
        if (!show_id || typeof show_id !== 'number') throw new ValidationError('show_id');
        return Show.getById(show_id);
    },

    async create({
        play_id,
        date
    }) {
        if (!play_id || typeof play_id !== 'number') throw new ValidationError('play_id');
        if (!date || typeof date !== 'number') throw new ValidationError('date');

        return Show.create(play_id, date);
    },

    async remove({
        show_id
    }) {
        if (!show_id || typeof show_id !== 'number') throw new ValidationError('show_id');
        return Show.remove(show_id);
    },
}