const knex = require('knex');
const { Model } = require ('objection');
const knexfile = require('./knexfile');

function psqlSetup() {
    const db = knex(knexfile.production);
    Model.knex(db);
}

module.exports = psqlSetup;