let crypto = require('../models/model')

//login
login = (req, res, next) => {
    const {email, password} = req.body
    crypto.comparePass(password, email)
    .then(matches => {
        res.json({matches})
    })
    .catch(e => next(e))
}


//overview
getSummary = (req, res, next) => {
   const user_id = req.params.user_id
//   crypto.getAllUserCoinsAndValue(user_id, 'Bitcoin', 'Ethereum', 'Litecoin')
//    .then(result => {
//       res.json(result)
//    })
//    .catch(e => next(e))

   const allCoins = [
       crypto.getNet(user_id),
       crypto.getQtyByCoin(user_id, 'Bitcoin'),
       crypto.getNetByCoin(user_id, 'Bitcoin'),
       crypto.getQtyByCoin(user_id, 'Ethereum'),
       crypto.getNetByCoin(user_id, 'Ethereum'),
       crypto.getQtyByCoin(user_id, 'Litecoin'),
       crypto.getNetByCoin(user_id, 'Litecoin'),
       crypto.getAllTransByUser(user_id)
   ]
   Promise.all(allCoins)
   .then(result => {
       const format = {
           'Total Invested' : result[0],
           'Bitcoin' : result[1],
           'NetInvestedinBitcoin' : result[2],
           'Ethereum' : result[3],
           'NetInvestedinEthereum' : result[4],
           'Litecoin' : result[5],
           'NetInvestedinLitecoin' : result[6],
           'AllTransactions' : result[7]
       }
       res.json(format)
   })
}

//individual
createTrans = (req, res, next) => {
    let {user_id, type_of_coin, qty, purchase_price, isBuy} = req.body
    crypto.createTrans(user_id, type_of_coin, qty, purchase_price, isBuy) 
    .then (results => {
        res.json(results)
    })
    .catch(err => next(err))
}

signup = (req, res, next) => {
    let {firstName, lastName, email, password} = req.body
    crypto.signup(firstName, lastName, email, password)
    .then (results => {
        res.json(results)
    })
    .catch(err => next(err))
}

getCoinSummary = (req, res, next) => {
    let user_id = req.params.user_id
    let cointype = req.params.cointype
    const coinSumArr = [
        crypto.getQtyByCoin(user_id, cointype),
        crypto.getNetByCoin(user_id, cointype),
        crypto.getAllTransByUserByCoin(user_id, cointype)
    ]
    Promise.all(coinSumArr)
    .then(results => {
        let format = {
            'Total Holdings' : results[0],
            'Total Invested' : results[1],
            'Transactions' : results[2]
        }
        res.json(format)
    })
    .catch(err => next(err))
}

updateTrans = (req, res, next) => {
    const id = req.params.id
    const { qty, purchase_price, isBuy } = req.body
    crypto.updateTrans(id, qty, purchase_price, isBuy)
    .then (results => {
        res.json(results)
    })
    .catch(err => next(err))
}

deleteTrans = (req, res, next) => {
    const id = req.params.id
    crypto.deleteTrans(id)
    .then (results => {
        res.json(results)
    })
    .catch (err => next(err))
}


module.exports = {
    createTrans,
    getSummary,
    getCoinSummary,
    updateTrans,
    deleteTrans,
    login,
    signup
}