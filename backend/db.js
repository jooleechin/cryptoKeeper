let env = process.env.NODE_ENV || 'development'
let config = require('./knexfile.js')[env]
let knex = require('knex')(config)

module.exports = knex