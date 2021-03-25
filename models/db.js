const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

mongoose.connect(process.env.DB_URL , {useCreateIndex:true , useFindAndModify:false , useNewUrlParser:true , useUnifiedTopology:true})
.then(()=>{
    console.log("Database Connected")
}).catch((err)=>{
    console.log(err)
})