var express = require('express');
var router = express.Router();
var pool = require('./db');


// inserts post into db
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

// posts user into db (do nothing if user already exists)
router.post('/api/post/usertodb', (req, res, next) => {
    const values = [
        req.body.email
    ]
    pool.query(`INSERT INTO users(email, date_created)
                    VALUES($1, NOW())
                    ON CONFLICT DO NOTHING`,  
        values, (q_err, q_res) => {
            res.json(q_res.rows)
        }
    )
})

// get user from db
router.get('/api/get/userfromdb', (req, res, next) => {
    const email = req.query.email;
    pool.query(`SELECT * FROM users
                WHERE email=$1`, 
        [email], (q_err, q_res) => {
            res.json(q_res.rows)
        })
})

// modify user values in db

module.exports = router;