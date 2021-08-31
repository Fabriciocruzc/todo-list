
exports.up = function(knex) {
    return knex.schema.createTable('tarefas', function (table){
        table.increments('id').primary();
        table.string('tarefa').notNullable();
        table.integer('usuario_id').notNullable();
        table.string('data').notNullable();

        table.foreign('usuario_id').references('id').inTable('usuario');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('tarefas');
};
