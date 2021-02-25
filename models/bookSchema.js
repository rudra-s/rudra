const mongoose = require("mongoose")

const bookSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    published:{
        type:Boolean,
    },
    dept:{
        type:String,
        required:true
    },
    // user:[{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:"User"
    //   }],
    created_at:{
        type:Date,
        default:Date.now()
    }
})

module.exports = mongoose.model("Book",bookSchema)