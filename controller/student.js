const express = require("express")
const mongoose = require("mongoose")
const User = require("../models/userSchema")
const Course = require("../models/courseSchema")
const Record = require("../models/studentRecord")
const auth = require("../middleware/auth")
const router = express.Router()

router.get("/:_id" ,[auth], async(req,res)=>{
    const valid = mongoose.Types.ObjectId.isValid(req.params._id)
    if(!valid) return res.status(422).json("Check the user Id !")
    try {
      const user = await User.findById(req.params._id).populate('course').populate('record').select('-password')
      if(req.params._id===req.user._id){
      res.status(200).json({Studentdata:user})
      }else{
          res.status(400).json({Studentdata:"Ivalid Id"})
      }
    } catch (error) {
        res.status(422).json({error:error})
    }
    
})
router.put("/subject/:_id", [auth], async(req,res)=>{
    const valid = mongoose.Types.ObjectId.isValid(req.params._id)
    if(!valid) return res.status(422).json("Check your courseId !")
    if(req.user.isSuperAdmin===true) return res.status(401).json("You are not authorized for this access!")
    try {
        const courses = await Course.findByIdAndUpdate(req.params._id)
        const users = await User.findById(req.user._id)
        await courses.save()
        users.course.push(courses._id)
        await users.save()
        res.status(200).json(users)
    } catch (error) {
        res.status(422).json({error:error})
    }
})

router.put("/record/:_id" ,[auth], async(req,res)=>{
    const valid = mongoose.Types.ObjectId.isValid(req.params._id)
    if(!valid) return res.status(422).json("Check your courseId !")
    if(req.user.isSuperAdmin && req.user.isAdmin===true) return res.status(401).json("You are not authorized for this access!")
    try {
        const records = await Record.findByIdAndUpdate(req.params._id)
        const users = await User.findById(req.user._id)
        await records.save()
        users.record.push(records._id)
        await users.save()
        res.status(200).json(users)
    } catch (error) {
        res.status(422).json({error:error})
    }
})


module.exports = router