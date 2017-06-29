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
            host: process.env.DATABASE_URL,
            database: 'sequr'
        }
    }
}