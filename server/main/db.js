const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'fftuna',
    password: 'Huwdbym83!',
    post: 5432
});


module.exports = pool;