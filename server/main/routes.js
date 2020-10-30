var express = require('express');
var router = express.Router();
var pool = require('./db');


// insterts post into db
router.post('/api/post/posttodb', (req, res, next) => {
    const values = [
        req.body.title,
        req.body.body,
        req.body.uid,
        req.body.username,
        req.body.page
    ]
    pool.query(`INSERT INTO posts(title, body, user_id, author, page_name, date_created)
                    VALUES($1, $2, $3, $4, $5, NOW())`,
        values, (q_err, q_res) => {
            if (q_err) return next(q_err);
            res.json(q_res.rows)
        }
    )
})

router.post('/api/post/usertodb', (req, res, next) => { // <-------------------- this is what you were working on
    const values = [                                    //                       need to enter users before they can post
        req.body.uid,
        req.body.username,
        req.body.email
    ]
    pool.query(`INSERT INTO users(uid, username, email, date_created, last_login)
                    VALUES($1, $2, $3, NOW(), NOW())`)
})

module.exports = router;