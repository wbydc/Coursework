const config = require('./.config.js');
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

const logger = require('./app/components/logger.js')('server');
const router = require('./app/router');

const app = express();
app.disable('x-powered-by');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(router);

app.use((error, req, res, next) => {
    res.json({
        success: false,
        error: 500
    });
    logger.error(error);
});

http.createServer(app).listen(config.server.port, () => {
    logger.info(`Listening on http://127.0.0.1:${config.server.port}`);
});