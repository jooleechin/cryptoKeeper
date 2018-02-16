let env = 'development'
let config = require('./knexfile.js')[env]
let knex = require('knex')(config)

module.exports = knex