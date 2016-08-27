'use strict';


import path from 'path';


/* 
 *  copy the content and create a new file named config.js in the config folder
 *  modify development, test, and production objects to match the credentials in
 *  your device
 */


let config = {
    development: {
        USERNAME: 'postgres',
        PASSWORD: 'postgres',
        DATABASE: 'eidr',
        HOST: 'localhost'
    },
    test: {
        USERNAME: 'postgres',
        PASSWORD: 'postgres',
        DATABASE: 'eidr',
        HOST: 'localhost'
    },
    production: {
        USERNAME: 'postgres',
        PASSWORD: 'postgres',
        DATABASE: 'eidr',
        HOST: 'localhost'
    },

    APP_NAME: 'EIDR',
    APP_URL: 'http://localhost:8000',

    ENV: 'development',
    PORT: 8000,
    STATIC_PORT: 8080,

    COOKIE_SECRET: 'PUT01SL0V3_PUT01SL1F3',
    COOKIE_NAME: '__t0p_S3cR3T',
    COOKIE_DOMAIN: 'http://localhost:8000',

    LOG_LEVEL: 'silly',
    LOGS_DIR: path.normalize(__dirname + '/../logs'),
    ASSETS_DIR: path.normalize(__dirname + '/../../public/')
};


config.DB_URL = [
                    'postgres://', config[config.ENV].USERNAME, ':',
                    config[config.ENV].PASSWORD, '@', config[config.ENV].HOST,
                    '/', config[config.ENV].DATABASE
                ].join('');


module.exports = config;