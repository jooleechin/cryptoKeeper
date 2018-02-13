
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, firstName: 'Joolee', lastName: 'Chin', email: 'jooleechin@gmail.com'},
        {id: 2, firstName: 'Bryce', lastName: 'Paine', email: 'painebryce@gmail.com'},
        {id: 3, firstName: 'Sarah', lastName: 'Chin', email: 'sarahchin@gmail.com'}
      ])
    })
    .then(() => {
        return knex.raw(
            `SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));`
        )
    })
}
