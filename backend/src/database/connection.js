const knex = require('knex');
const configurations = require('./../../knexfile');
const env = process.env.NODE_ENV;
const configuration = env === 'test' ? configurations.test : configurations.development;
const connection = knex(configuration);
module.exports = connection;