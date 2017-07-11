'use strict';

var bookshelf = require('../bookshelf');

var User = bookshelf.MAX.extend({
    tableName: 'users',
});

module.exports = User;