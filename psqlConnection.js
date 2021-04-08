require('dotenv').config();

const Pool = require("pg").Pool;

const pool = new Pool({
    host: 'localhost',
    user: process.env.DEV_DB_USER,
    password: process.env.DEV_DB_PASSWORD,
    database: 'snaip'
});

module.exports = pool;