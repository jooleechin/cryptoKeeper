const path = require('path')

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/cryptoTransactions'
   },
  production: {
    client: 'pg',
    connection: process.env.HEROKU_POSTGRESQL_COPPER_URL
   }
}
