require('./models/db')
require("express-async-errors")
const error = require("./middleware/error")
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const port = process.env.PORT || 8080
const user = require("./controller/register")
const record = require("./controller/user")
const course = require("./controller/course")
const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json())
app.use(cors({
    origin:['http://localhost:3000'], 
    credentials:true,           
}));
app.use(cookieParser())
app.use('/api/user',user)
app.use('/api/user/data',record)
app.use('/api/user/course',course)

app.use(error)


app.get("/",(req,res)=>{
    res.json("Node js")
})

app.listen(port ,()=>{
    console.log(`Server is running on ${port} number`)
})

