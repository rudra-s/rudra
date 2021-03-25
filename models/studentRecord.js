const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    dob:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    marks:[{
        submark:{
        type:Number,
        required:true
        },
        grade:{
            type:String,
            requird:true
        }
    }],
})

module.exports = mongoose.model('Record',studentSchema)