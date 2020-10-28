var express = require('express');
var router = express.Router();
var pool = require('./db');

// router.get('/api/hello', (req, res) => {
//     res.json('cool cool')
// })

router.post('/api/post/posttodb', (req, res, next) => {
    const values = [
        req.body.title,
        req.body.body,
        req.body.uid,
        req.body.username,
        req.body.page
    ]
    pool.query(`INSERT INTO posts(title, body, user_id, author, date_created)
                    VALUES($1, $2, $3, $4, $5, NOW() )`,
        values, (q_err, q_res) => {
            if (q_err) return next(q_err);
            res.json(q_res.rows)
        })
})

module.exports = router