let express = require('express')
let cors = require('cors')
let bodyParser = require('body-parser')
let app = express()

app.use(cors())
app.use(bodyParser.json()) //gives you access to req.body

let transactions = require('./models/model')
let controller = require('./controllers/controller')

app.get('/transactions/user/:user_id', controller.getAllTransByUser)
app.get('/transactions/user/:user_id/coin/:cointype', controller.getAllTransByUserByCoin)
app.post('/transactions', controller.createTrans)
app.get('/transactions/user/:user_id/coinNet/:cointype', controller.getNetByCoin)
app.get('/transactions/user/:user_id/coinQty/:cointype', controller.getQtyByCoin)
app.put('/transactions/:id', controller.updateTrans)
app.delete('/transactions:/id', controller.deleteTrans)
app.get('/summary/user/:user_id/', controller.getSummary)
app.get('/summary/userNet/:user_id', controller.getNet)


const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))