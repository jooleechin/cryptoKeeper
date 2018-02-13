
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('transactions').del()
    .then(function () {
      // Inserts seed entries
      return knex('transactions').insert([
        {id: 1, user_id: 1, type_of_coin: 'Ethereum', qty: 10, purchase_price: 348.24, isBuy: true},
        {id: 2, user_id: 3, type_of_coin: 'Bitcoin', qty: 2, purchase_price: 9936.74, isBuy: true},
        {id: 3, user_id: 2, type_of_coin: 'Litecoin', qty: 43, purchase_price: 24.78, isBuy: true},
        {id: 4, user_id: 1, type_of_coin: 'Ethereum', qty: 2, purchase_price: 9936.74, isBuy: true},
        {id: 5, user_id: 1, type_of_coin: 'Ethereum', qty: 43, purchase_price: 24.78, isBuy: true},
        {id: 6, user_id: 2, type_of_coin: 'Bitcoin', qty: 2, purchase_price: 9936.74, isBuy: true},
        {id: 7, user_id: 2, type_of_coin: 'Litecoin', qty: 43, purchase_price: 24.78, isBuy: true}
      ])
    })
    .then(() => {
        return knex.raw(
            `SELECT setval('transactions_id_seq', (SELECT MAX(id) FROM transactions));`
        )
    })
}
