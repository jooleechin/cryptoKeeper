
exports.up = function(knex, Promise) {
    return knex.schema.hasTable('transactions')
    .then (exists => {
        if (!exists) {
            return knex.schema.createTable('transactions', table => {
                table.increments().primary()
                table.integer('user_id').notNullable().defaultsTo(0)
                table.foreign('user_id').references('users.id')
                table.enu('type_of_coin', ['Bitcoin', 'Ethereum', 'Litecoin']).notNullable()
                table.integer('qty').notNullable().defaultsTo(0)
                table.decimal('purchase_price', 10, 2).notNullable().defaultsTo('0')
                table.boolean('isBuy').notNullable().defaultsTo(true)
                table.timestamps(true, true)
            })
        }
    })
}

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('transactions')
}
