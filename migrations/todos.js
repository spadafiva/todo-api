'use strict';

exports.up = function(knex) {
    return knex.schema
        .createTable('todos', function (table) {
            table.increments('id').primary();
            table.string('description').notNullable();
            table.boolean('completed').notNullable();
        });
};

exports.down = function(knex) {
    return knex.schema
        .dropTable('todos');
};