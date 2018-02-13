let knex = require('../db')
function userTrans () {
    return knex('transactions')
    .join ('users', 'transactions.user_id', 'users.id')
}
    
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

function getNetByCoin(user_id, cointype) {
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

function updateTrans(id, user_id, qty, purchase_price, isBuy) {
    return knex('transactions')
    .where('transactions.id', id)
    .first()
    .then (foundTrans => {
        foundTrans.user_id = user_id
        foundTrans.qty = qty
        foundTrans.purchase_price = purchase_price
        foundTrans.isBuy = isBuy
    })
    .then (result => {
        return result
    })
}

function deleteTrans(id) {
    return knex('transactions')
    .where('transactions.id', id)
    .del()
}

//overview
function getNet(user_id) {
    return userTrans
    .then (resultsArr => {
        return resultsArr.reduce((memo, ele) => {
            return memo + (ele.qty * ele.purchase_price)
        }, 0)
    })
}

function getQtyOfCoin(coin) {
    return userTrans
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

//function getMarketValue(user_id) {
//    return knex('transactions')
//    .join ('users', 'transactions.user_id', 'users.id')
//    .where('transactions.user_id', user_id)
//    .then (resultsArr => {
//        return resultsArr.qty
//    })
//}

//function getProfitLoss(user_id) {
//    return knex('transactions')
//    .join ('users', 'transactions.user_id', 'users.id')
//    .where('transactions.user_id', user_id)
//    .then (resultsArr => {
//        if (resultsArr.isBuy) {
//            return resultsArr.reduce((memo, ele) => {
//                return getNet(user_id) - memo + (ele.qty * ele.purchase_price)
//            }, 0)
//        } else {
//            return resultsArr.reduce((memo, ele) => {
//                return memo - (ele.qty * ele.purchase_price)
//            }, 0)
//        }
//    })
//}


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
    getQtyOfCoin
    
}