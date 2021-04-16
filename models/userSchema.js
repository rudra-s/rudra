const mongoose = require('mongoose')
const jwt = require("jsonwebtoken")
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:3,
        maxlength:128
    },
    email:{
        type:String,
        required:true,
        minlength:11,
        maxlength:140,
        unique:true
    },
    photo:{
       type:String
    },
    password:{
        type:String,
        required:true
    },
    cpassword:{
        type:String,
        required:true
    },
    department:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true,
        unique:true
    },
    roles:{
        type:String,
        enum:['user','admin'],
        default:'user',
    },
    course:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
    }],
    record:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Record"
    }],
    created_at:{
        type:Date,
        default:Date.now()
    }
})

module.exports = mongoose.model("User" , userSchema)