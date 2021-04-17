
exports.up = function(knex) {
  return knex.schema
    .createTable('users', table =>  {
        table.uuid('id').defaultsTo(knex.raw('uuid_generate_v4()')).primary();
        table.string('password').notNullable();
        table.string('email').notNullable();
        table.string('handle').notNullable();
    });

};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('users')
};
