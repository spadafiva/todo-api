'use strict';

var bookshelf = require('../bookshelf');

var Todo = bookshelf.Model.extend({
    tableName: 'todos',
});

module.exports = Todo;