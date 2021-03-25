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

})

module.exports = mongoose.model("Course",courseSchema)