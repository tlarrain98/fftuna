var express = require('express')
var router = express.Router()

router.get('/api/hello', (req, res) => {
    res.json('cool cool')
})

module.exports = router