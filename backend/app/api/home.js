const Actor = require('../models/Actor');
const Play = require('../models/Play');
const Role = require('../models/Role');
const Show = require('../models/Show');

module.exports = {
    async getCounts() {
        return {
            actors: await Actor.getCount(),
            plays: await Play.getCount(),
            roles: await Role.getCount(),
            shows: await Show.getCount(),
        };
    },
};