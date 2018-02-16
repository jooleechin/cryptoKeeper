
exports.up = function(knex, Promise) {
    return knex.schema.hasTable('users')
    .then (exists => {
        if (!exists) {
            return knex.schema.createTable('users', table => {
                table.increments().unsigned().primary()
                table.string('firstName').notNullable().defaultsTo('')
                table.string('lastName').notNullable().defaultsTo('')
                table.string('email').notNullable().defaultsTo('')
                table.string('password').notNullable().defaultsTo('')
                table.timestamps(true, true)
            })
        }
    })
}

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users')
}
