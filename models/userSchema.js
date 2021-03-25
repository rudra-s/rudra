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
    address:[{
        state:{
            type:String,
            required:true
        },
        code:{
            type:Number,
            required:true
        }
    }],
    isAdmin:{
            type:Boolean,
            required:true,
            default:false
        },
        isSuperAdmin:{
            type:Boolean,
            required:true,
            default:false
        },
        tokens:[{
            token:{
                type:String,
                required:true
            }
        }],
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

userSchema.methods.authTokenJwt = async function(){
    const token = await jwt.sign({_id:this._id},process.env.accessTokenKey)
    this.tokens = this.tokens.concat({token})
    await this.save()
    return token
}

module.exports = mongoose.model("User" , userSchema)