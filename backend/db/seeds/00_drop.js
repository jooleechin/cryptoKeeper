exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('transactions').del()
        .then (() => knex('users').del())
}