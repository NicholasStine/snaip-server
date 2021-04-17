
exports.up = function(knex) {
    return knex.schema
        .createTable('images', table => {
            table.uuid('id').defaultsTo(knex.raw('uuid_generate_v4()')).primary();
            table.string('user_id')
            table.string('img_name')
            table.string('img_url')
        })
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('images')
};
