require('dotenv').config()
const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const cors = require('cors')
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE).then(() =>
  console.log('Database connected.')).catch((e) =>
  console.log('Database not connected.\n', e)
)

//Routers
const authRouter = require('./routes/authRouter')
const dashboardRouter = require('./routes/dashboardRouter')
const transactionsRouter = require('./routes/transactionsRouter')

app.use(express.json())
app.use(cookieParser())
app.use(cors(
  {
    origin : true, credentials: true
  }
))

app.use('/transactions', transactionsRouter)
app.use('/dashboard', dashboardRouter)
app.use('/api/auth', authRouter)

const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log(`the server is running on port : ${port}`)
})

module.exports = app