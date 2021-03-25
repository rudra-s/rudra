require('./models/db')
const express = require('express')
const bodyParser = require('body-parser')
const port = process.env.PORT || 8080
const register = require("./controller/register")
const course = require("./controller/course")
const student = require("./controller/student")
const userAction = require("./controller/userAction")
const record = require("./controller/record")
const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json())
app.use('/api/user/',register)
app.use('/api/user/course/',course)
app.use('/api/user/student/',student)
app.use('/api/user/useraction/',userAction)
app.use('/api/user/',record)



app.get("/",(req,res)=>{
    res.json("Node js")
})

app.listen(port ,()=>{
    console.log(`Server is running on ${port} number`)
})

