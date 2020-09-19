const express = require('express');
const router = express.Router();

const {
    ValidationError,
    AccessError
} = require('../class/Error');
const logger = require('../components/logger')('api');

const api = {
    home: require('./home'),
    actors: require('./actors'),
    plays: require('./plays'),
    shows: require('./shows'),
    roles: require('./roles'),
    works: require('./works'),
};

for (let model in api) {
    for (let method in api[model]) {
        const path = `/${model}/${method}`;
        const handler = api[model][method];

        router.post(path, async (req, res) => {
            try {
                let data = await handler(req.body);
                res.json({
                    success: true,
                    data
                });
            } catch (error) {
                if (error instanceof ValidationError) {
                    return res.json({
                        success: false,
                        error: 400,
                        message: error.message
                    });
                }
                if (error instanceof AccessError) {
                    return res.json({
                        success: false,
                        error: 403,
                        message: error.message
                    });
                }

                res.json({
                    success: false,
                    error: 500,
                    message: 'Server Error'
                });
                logger.error(path, error);
            }
        });
    }
}

router.use((req, res) => {
    res.json({
        success: false,
        error: 404,
        message: 'Not found'
    });
});

module.exports = router;