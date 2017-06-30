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
        connection: JSON.parse(process.env.DATABASE_URL)
    }
}