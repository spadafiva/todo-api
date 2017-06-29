'use strict';

module.exports = {
    development: {
        client: 'postgresql',
        connection: {
            database: 'sequr'
        }
    },
    production: {
        client: 'postgresql',
        connection: {
            host: 'postgres://jhpohjusbdvrog:1d15ae74a409c2b3ca15115d8ef2e4c5e0b015a590fe5dedd701a98a75bfae6d@ec2-23-23-225-12.compute-1.amazonaws.com:5432/d8n7rjd9t2kabf',
            database: 'sequr'
        }
    }
}