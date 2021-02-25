const express = require('express')
const bodyParser = require('body-parser')
const port = process.env.PORT || 3001
require('./models/db')
const user = require('./controllers/user')
const login = require('./controllers/login')
const book = require("./controllers/book")
//const admin = require("./controllers/admin")

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
//app.use('/api/admin',admin)
app.use('/api/user',user)
app.use('/api/user/login',login)
app.use('/api/book/',book)








app.listen(port,()=>{
    console.log(`server is running on ${port} port`)
})