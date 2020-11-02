var express = require('express');
var router = express.Router();
var pool = require('./db');

/**
 * ROUTES FOR POSTS
 */

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
            console.log(q_res)
            res.json(q_res)
        }
    )
})

// gets posts from db
router.get('/api/get/postsfromdb', (req, res, next) => {
    const values = [
        req.query.offset,
        req.query.numposts
    ]
    pool.query(`SELECT *
                FROM posts
                ORDER BY date_created
                OFFSET $1
                LIMIT $2`,
        values, (q_err, q_res) => {
            if(q_err) return q_err
            // console.log(q_err)
            // console.log(q_res)           
            console.log(values)
            res.json(q_res.rows)
        })
})

/**
 * ROUTES FOR USERS
 */

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
        }
    )
})

// modify or set username
router.put('/api/put/username', (req, res, next) => {
    const values = [
        req.body.uid,
        req.body.username
    ]
    pool.query(`UPDATE users
                SET username=$2
                WHERE uid=$1`,
        values, (q_err, q_res) => {
            if(q_err) return next(q_err);
            res.json(q_res.rows)
        }
    )
})

module.exports = router;