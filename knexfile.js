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
        connection: 'postgres://ndzwixkshzeoqm:33efb1fea78baaa21cb6e9b741cf3866dc044df4525b27776ae4db6761fd31cf@ec2-50-19-83-146.compute-1.amazonaws.com:5432/d22su8sr1jv2af'
    }
}