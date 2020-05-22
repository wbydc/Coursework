const {
    LoggerFactory
} = require('../lib/Loggery');
const config = require('../../.config');

const factory = new LoggerFactory({
    path: config.logs
});

module.exports = (source) => {
    return factory.new(source);
};