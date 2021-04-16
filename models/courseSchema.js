const mongoose = require("mongoose")

const courseSchema = new mongoose.Schema({
    cname:{
        type:String,
        required:true
    },
    cdepartment:{
        type:String,
        required:true
    },
    // status:{
    //     type:Boolean,
    //     default :false
    // },
    created_at:{
        type:Date,
        default:Date.now()
    }

})

module.exports = mongoose.model("Course",courseSchema)