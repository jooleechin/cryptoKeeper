let express = require('express')
let cors = require('cors')
let bodyParser = require('body-parser')
let app = express()

app.use(cors())
app.use(bodyParser.json()) //gives you access to req.body

let transactions = require('./models/model')
let controller = require('./controllers/controller')

app.post('/transactions', controller.createTrans)
app.get('/summary/user/:user_id', controller.getSummary)
app.get('/summary/user/:user_id/coin/:cointype', controller.getCoinSummary)
app.put('/transactions/:id', controller.updateTrans)
app.delete('/transactions/:id', controller.deleteTrans)
app.post('/login', controller.login)
app.post('/users', controller.signup)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))