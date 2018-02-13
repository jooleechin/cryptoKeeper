let crypto = require('../models/model')

//individual
getAllTransByUser = (req, res, next) => {
    let user_id = req.params.user_id
    crypto.getAllTransByUser(user_id)
    .then (results => {
        res.json(results)
    })
}

getAllTransByUserByCoin = (req, res, next) => {
    let user_id = req.params.user_id
    let cointype = req.params.cointype
    crypto.getAllTransByUserByCoin(user_id, cointype)
    .then (results => {
        res.json(results)
    })
}

createTrans = (req, res, next) => {
    let {user_id, type_of_coin, qty, purchase_price, isBuy} = req.body
    crypto.createTrans(user_id, type_of_coin, qty, purchase_price, isBuy) 
    .then (results => {
        res.json(results)
    })
    .catch(err => nex(err))
}

getNetByCoin = (req, res, next) => {
    let user_id = req.params.user_id
    let cointype = req.params.cointype
    crypto.getNetByCoin(user_id, cointype)
    .then (results => {
        res.json(results)
    })
    .catch(err => next(err))
}

getQtyByCoin = (req, res, next) => {
    let user_id = req.params.user_id
    let cointype = req.params.cointype
    crypto.getQtyByCoin(user_id, cointype)
    .then (results => {
        res.json(results)
    })
    .catch(err => next(err))
}

updateTrans = (req, res, next) => {
    const id = req.params.id
    const { user_id, qty, purchase_price, isBuy } = req.body
    crypto.updateTrans(id, user_id, qty, purchase_price, isBuy)
    .then (results => {
        res.json(results)
    })
    .catch(err => next(err))
}

deleteTrans = (req, res, next) => {
    const id = req.params.id
    const trans = crypto.deleteTrans(id)
    .then (results => {
        res.json(results)
    })
    .catch (err => next(err))
}

//overview

getSummary = (req, res, next) => {
   crypto.getNet(id).then(result => {
       return crypto.getQtyByCoin('Bitcoin')
   }).then (result => {
       res.json(result)
   })
}

getNet = (req, res, next) => {
    let user_id = req.params.user_id
    crypto.getNet(id)
    .then (result => {
        res.json(result)
    })
    .catch (err => next(err))
}


module.exports = {
    getAllTransByUser,
    getAllTransByUserByCoin,
    createTrans,
    getNetByCoin,
    getQtyByCoin,
    updateTrans,
    deleteTrans,
    getSummary,
    getNet
}