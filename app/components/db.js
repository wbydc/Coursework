const config = require('../../.config.js');
const {
    Client
} = require('pg');

const db = new Client({
    connectionString: config.db.pgsql_uri
});

db.connect();

module.exports = db;