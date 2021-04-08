
exports.up = function(knex) {
  return knex.schema
    .createTable('users', table =>  {
        table.uuid('id').defaultsTo(knex.raw('uuid_generate_v4()')).primary();
        
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('users')
};
