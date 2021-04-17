require('dotenv').config();

const Pool = require("pg").Pool;

// const pool = new Pool({
//     host: 'localhost',
//     user: process.env.DEV_DB_USER,
//     password: process.env.DEV_DB_PASSWORD,
//     database: 'snaip'
// });

const pool = new Pool({
    host: 'ec2-18-206-20-102.compute-1.amazonaws.com',
    user: 'worjuivnqqsswl',
    password: '976b03bf9a3071e23e1bc45084caa4f786684219c9f6f146f1b73836a161bb2b',
    database: 'd2h4635bv7ode5'
})

module.exports = pool;