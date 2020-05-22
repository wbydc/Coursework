module.exports = {
    logs: __dirname + '/logs/%level%.log',
    db: {
        pgsql_uri: "postgresql://username:password@ip:port/basename",
    },
    server: {
        port: 8080
    }
}