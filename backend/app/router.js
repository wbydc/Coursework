const express = require('express');
const router = express.Router();

const api = require('./api/');

router.use(express.static(__dirname + '/../public/'));
router.use('/api/', api);

module.exports = router;