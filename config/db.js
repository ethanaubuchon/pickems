const DB_CONFIG = require('../knexfile')[process.env.NODE_ENV || 'development'];
const Knex = require('knex');

module.exports = Knex(DB_CONFIG);
