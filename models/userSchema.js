const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    user:{
        type:String,
        required:true,
        minlength:3,
        maxlength:133
    },
    email:{
        type:String,
        required:true,
        unique:true,
        minlength:10,
        maxlength:140
    },
    password:{
        type:String,
        required:true
    },
    book:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Book"
    }]
});
module.exports = mongoose.model('User',userSchema)