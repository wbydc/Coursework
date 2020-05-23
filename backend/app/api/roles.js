const {
    ValidationError
} = require('../class/Error');
const Role = require('../models/Role');

module.exports = {
    async getAll() {
        return Role.getAll();
    },

    async getList() {
        return Role.getList();
    },

    async getById({
        role_id
    }) {
        if (!role_id || typeof role_id !== 'number') throw new ValidationError('role_id');
        return Role.getById(role_id);
    },

    async create({
        show_id,
        title,
        salary
    }) {
        if (!show_id || typeof show_id !== 'number') throw new ValidationError('show_id');
        if (!title || typeof title !== 'string' || title.trim() == '') throw new ValidationError('title');
        if (!salary || typeof salary !== 'number') throw new ValidationError('salary');

        return Role.create(show_id, title, salary);
    },

    async remove({
        role_id
    }) {
        if (!role_id || typeof role_id !== 'number') throw new ValidationError('role_id');
        return Role.remove(role_id);
    },
}