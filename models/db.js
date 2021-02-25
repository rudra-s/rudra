const mongoose = require('mongoose')
const dotenv = require("dotenv")

dotenv.config();

mongoose.connect(process.env.DB_CONNECT , {useCreateIndex:true,useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true,useFindAndModify:false})
.then(()=>{
    console.log("Database Connected")
})
.catch((error)=>{
    console.log(error)
})