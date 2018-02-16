let knex = require('../db')
    
//individual
function getAllTransByUser(user_id) {
    return knex('transactions')
    .where('user_id', user_id)
    .then(results => {
        return results
    })
}

function getAllTransByUserByCoin(user_id, cointype) {
    return knex('transactions')
    .where({
        'transactions.user_id': user_id,
        'transactions.type_of_coin': cointype
    })
    .then (results => {
        return results
    }
)}

function createTrans(user_id, type_of_coin, qty, purchase_price, isBuy) {
    return knex('transactions')
    .insert({
        user_id,
        type_of_coin,
        qty,
        purchase_price, 
        isBuy
    })
    .returning('*')
}

function getNetByCoin(cointype, user_id) {
    return knex('transactions')
    .where({
        'transactions.user_id': user_id,
        'transactions.type_of_coin': cointype
    })
    .then (results => {
        return results.filter(ele => {
            return ele.type_of_coin === cointype
        })
    })
    .then (results => {
        return results.reduce((memo, ele) => {
            return memo + (ele.qty * ele.purchase_price)
        }, 0)
    })
}

function getQtyByCoin(user_id, cointype) {
    return knex('transactions')
    .where({
        'transactions.user_id': user_id,
        'transactions.type_of_coin': cointype
    })
    .then (results => {
        return results.filter(ele => {
            return ele.type_of_coin === cointype
        })
    })
    .then (results => {
        return results.reduce((memo, ele) => {
            return memo + ele.qty
        }, 0)
    })
}

function updateTrans(id, qty, purchase_price, isBuy) {
    return knex('transactions')
    .where('transactions.id', id)
    .update({
        qty,
        purchase_price,
        isBuy
    })
    .returning('*')
    .then (result => {
        return result
    })
}

function deleteTrans(id) {
    return knex('transactions')
    .where('transactions.id', id)
    .del()
    .returning('*')
}

//overview

function getQtyOfCoin(coin, user_id) {
    return knex('transactions')
    .where({
        'transactions.type_of_coin': coin,
        'transactions.user_id': user_id
    })
    .then (resultsArr => {
        return resultsArr.filter(ele => {
            return ele.type_of_coin === coin
        })
    })
    .then (results => {
        return results.reduce((memo, ele) => {
            return memo + ele.qty
        }, 0)
    })
}

function getNet(user_id) {
    return knex('transactions')
    .where('user_id', user_id)
    .then (resultsArr => {
        return resultsArr.reduce((memo, ele) => {
            return memo + (ele.qty * ele.purchase_price)
        }, 0)
    })
}

function getMarketValue(user_id) {
    return knex('transactions')
    .join ('users', 'transactions.user_id', 'users.id')
    .where('transactions.user_id', user_id)
    .then (resultsArr => {
        return resultsArr.qty
    })
}

function comparePass(password, email) {
    return knex('users')
    .where({
        'password': password,
        'email': email
    }) 
    .first()
    .then (result => {
        if (result) {
            return result
        }
        return false
    })
}

function signup(firstName, lastName, email, password) {
    return knex('users')
    .insert({
        firstName,
        lastName,
        email,
        password
    })
    .returning('*')
}


module.exports = {
    //overview
    getAllTransByUser,
    getAllTransByUserByCoin,
    createTrans,
    getNetByCoin,
    getQtyByCoin,
    updateTrans,
    deleteTrans,
    //individual
    getNet,
    getQtyOfCoin,
    comparePass,
    signup
}