let knex = require('../db')

const COIN_TYPES = ['Bitcoin', 'Ethereum', 'Litecoin']

//function getAllTransByUserByCoin(user_id, ...coins) {    
//   let qtyPromises = COIN_TYPES.map(coin => getQtyByCoin(user_id, coin))
//   let netPromises = COIN_TYPES.map(coin => getNetByCoin(user_id, coin))
//   Promise.all([getNet(user_id), ...qtyPromises, ...netPromises])    
//     .then(result => {
//       const format = {
//           'Total Invested' : result[0],
//           'Bitcoin' : result[1],
//           'NetInvestedinBitcoin' : result[2],
//           'Ethereum' : result[3],
//           'NetInvestedinEthereum' : result[4],
//           'Litecoin' : result[5],
//           'NetInvestedinLitecoin' : result[6],
//           'AllTransactions' : result[7]
//       }
//       return format
//    })  
//  const allCoins = [
//       getNet(user_id),
//       getQtyByCoin(user_id, 'Bitcoin'),
//       getNetByCoin(user_id, 'Bitcoin'),
//       getQtyByCoin(user_id, 'Ethereum'),
//       getNetByCoin(user_id, 'Ethereum'),
//       getQtyByCoin(user_id, 'Litecoin'),
//       getNetByCoin(user_id, 'Litecoin'),
//       getAllTransByUser(user_id)
//   ]  
//  
//   Promise.all(allCoins)
//    .then(result => {
//       const format = {
//           'Total Invested' : result[0],
//           'Bitcoin' : result[1],
//           'NetInvestedinBitcoin' : result[2],
//           'Ethereum' : result[3],
//           'NetInvestedinEthereum' : result[4],
//           'Litecoin' : result[5],
//           'NetInvestedinLitecoin' : result[6],
//           'AllTransactions' : result[7]
//       }
//       return format
//    })
//}
    
//individual
function getAllTransByUser(user_id) {
    return knex('transactions')
    .where('user_id', user_id)
    .then(results => {
        return results
    })
}

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

//getCoinSummary
function getQtyByCoin(user_id, cointype) {
    return knex('transactions')
    .where({
        'transactions.user_id': user_id,
        'transactions.type_of_coin': cointype,
    })
    .then (results => {
        return results.filter(ele => {
            return ele.type_of_coin === cointype
        })
    })
    .then (results => {
        let positive = 0
        let minus = 0
        results.forEach(ele => {
            if (ele.isBuy == true) {
                positive += ele.qty
            } else {
                minus += ele.qty
            }
        })
        return positive - minus
        
        /*
        let {postive, minus} = results.reduce((total, ele) => {
          if (ele.isBuy) {
              return {...total, positive: total.positive + ele.qty}
          }
          return {...total, minus: total.negative + ele.qty}
        }, {positive: 0, minus: 0})
        return postive - minus*/
        /*let result = results.reduce((total, ele) => {
          if (ele.isBuy) return total + ele.qty
          return total - ele.qty
        }, 0)
        return result*/
    })
}

//function calculate(data, prop) {
//        let positive = 0
//        let minus = 0
//        results.forEach(ele => {
//            if (ele.isBuy == true) {
//                positive += ele.qty * ele[prop]
//            } else {
//                minus += ele.qty * ele[prop]
//            }
//        })
//        return positive - minus
//}
//
//calculate(data, 'purchase_price')
//calculate(data, 'qty')

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
        let positive = 0
        let minus = 0
        results.forEach(ele => {
            if (ele.isBuy == true) {
                positive += ele.qty * ele.purchase_price
            } else {
                minus += ele.qty * ele.purchase_price
            }
        })
        return positive - minus
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
/*done with getcoinSummary*/

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
    comparePass,
    signup
}