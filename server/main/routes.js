var express = require('express');
var router = express.Router();
var pool = require('./db');

router.get('/api/hello', (req, res) => {
    res.json('cool cool')
})

module.exports = router