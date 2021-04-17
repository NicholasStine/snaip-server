// Update with your config settings.
require('dotenv').config();

module.exports = {
  development: {
    client: 'pg',
    connection: {
      // user: process.env.DEV_DB_USER,
      // password: process.env.DEV_DB_PASSWORD,
      user: 'snaiper',
      password: '7t59hi3mio8',
      host: 'localhost',
      database: 'snaip'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      connectionString: 'postgres://worjuivnqqsswl:976b03bf9a3071e23e1bc45084caa4f786684219c9f6f146f1b73836a161bb2b@ec2-18-206-20-102.compute-1.amazonaws.com:5432/d2h4635bv7ode5',
      ssl: { rejectUnauthorized: false }
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
