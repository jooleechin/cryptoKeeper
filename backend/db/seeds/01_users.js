
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, firstName: 'Joolee', lastName: 'Chin', email: 'jooleechin@gmail.com', password: 'poop'},
        {id: 2, firstName: 'Bryce', lastName: 'Paine', email: 'painebryce@gmail.com', password: 'poop1'},
        {id: 3, firstName: 'Sarah', lastName: 'Chin', email: 'sarahchin@gmail.com', password: 'poopoo'},
        {id: 4, firstName: 'test', lastName: 'test', email: 'test@gmail.com', password: 'test'}
      ])
    })
    .then(() => {
        return knex.raw(
            `SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));`
        )
    })
}
