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
            res.json(q_res);
        }
    )
})

// gets singular post from db
router.get('/api/get/post', (req, res, next) => {
    const values = [
        req.query.pid
    ]
    pool.query(`SELECT *
                FROM posts
                WHERE pid = $1`,
        values, (q_err, q_res) => {
            if (q_err) return next(q_err)
            res.json(q_res.rows)
        }
    )
})

// gets posts from db
router.get('/api/get/postsfromdb', (req, res, next) => {

    if (req.query.pageName) {
        const values = [
            req.query.offset,
            req.query.postsPerPage,
            req.query.pageName
        ]
        pool.query(`SELECT *
                    FROM posts
                    WHERE page_name = $3
                    ORDER BY date_created DESC
                    OFFSET $1
                    LIMIT $2`,
            values, (q_err, q_res) => {
                if (q_err) return next(q_err)
                res.json(q_res.rows)
            }
        )
    }
    else {
        const values = [
            req.query.offset,
            req.query.postsPerPage
        ]
        pool.query(`SELECT *
                    FROM posts
                    ORDER BY date_created DESC
                    OFFSET $1
                    LIMIT $2`,
            values, (q_err, q_res) => {
                if (q_err) return next(q_err)
                // console.log(q_err)
                // console.log(q_res)           
                res.json(q_res.rows)
            }
        )
    }
})

// get total number of posts from db
router.get('/api/get/numpostsfromdb', (req, res, next) => {
    if (req.query.pageName) {
        const values = [
            req.query.pageName
        ]
        pool.query(`SELECT COUNT(*)
                    FROM posts
                    WHERE page_name = $1`,
            values, (q_err, q_res) => {
                if (q_err) return next(q_err)
                // console.log(q_err)
                // console.log(q_res)  
                res.json(q_res.rows)
            }
        )
    }
    else {
        pool.query(`SELECT COUNT(*)
                    FROM posts`,
            null, (q_err, q_res) => {
                if (q_err) return next(q_err)
                res.json(q_res.rows)
            }
        )
    }
})

// delete post from db
router.delete('/api/delete/post', (req, res, next) => {
    const pid = req.body.pid;
    pool.query(`DELETE FROM posts 
                WHERE pid = $1`,
        [pid], (q_err, q_res) => {
            res.json(q_res.rows);
        }
    )
})

// delete all comments on post from db
router.delete('/api/delete/allcomments', (req, res, next) => {
    const pid = req.body.pid;
    pool.query(`DELETE FROM comments
                WHERE post_id = $1`,
        [pid], (q_err, q_res) => {
            res.json(q_res.rows);
        }
    )
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
            if (q_err) return next(q_err);
            res.json(q_res.rows)
        }
    )
})


/**
 * ROUTES FOR COMMENTS
 */

// post comment to database
router.post('/api/post/comment', (req, res, next) => {
    const values = [
        req.body.comment,
        req.body.author,
        req.body.uid,
        req.body.pid
    ]
    pool.query(`INSERT INTO comments(comment, author, user_id, post_id, date_created)
                VALUES($1, $2, $3, $4, NOW())`,
        values, (q_err, q_res) => {
            if (q_err) return next(q_err);
            res.json(q_res);
        }
    )
})

// get comments on a post
router.get('/api/get/commentsonpost', (req, res, next) => {
    const values = [
        req.query.pid
    ]
    pool.query(`SELECT *
                FROM comments
                WHERE post_id = $1`,
        values, (q_err, q_res) => {
            if (q_err) return next(q_err);
            res.json(q_res.rows);
        }
    )
})

module.exports = router;