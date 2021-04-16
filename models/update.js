const mongoose = require('mongoose')

const updateSchema = new mongoose.Schema({
    dob:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    postcode:{
        type:Number,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    xcgpa:{
        type:Number,
        required:true
    },
    xiicgpa:{
        type:Number,
        required:true
    },
    xpass:{
        type:Number,
        required:true
    },
    xiipass:{
        type:Number,
        required:true
    }
   
})

module.exports = mongoose.model('Record',updateSchema)