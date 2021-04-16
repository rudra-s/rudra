const express = require('express')
const Course = require("../models/courseSchema")
const User = require("../models/userSchema")
const valid = require("../middleware/validId")
const auth = require("../middleware/auth")
const admin = require("../middleware/admin")
const {check , validationResult} = require('express-validator')
const router = express.Router()

router.get("/allcourse",auth,async(req,res)=>{
    try {
     let course = await Course.find().select('-user -__v ')
     res.status(200).json(course)
    } catch (error) {
        res.status(422).json({message:error.message})
    }
})

router.get("/:_id",auth,async(req,res)=>{
    try {
     let course = await Course.findById({_id:req.params._id}).select('-user -__v ')
     res.status(200).json(course)
    } catch (error) {
        res.status(422).json({message:error.message})
    }
})

router.post("/post",[
    check("cname").isString().isLength({min:3,max:15}),
    check("cdepartment").isString().isLength({min:3,max:15})
],[auth,admin], async(req,res)=>{
    const error = validationResult(req)
    if(!error.isEmpty()) return res.status(422).json({message:error.message})
    let course = await Course.findOne({cname:req.body.cname})
    if(course){
        res.status(422).json('Allready Exists')
    } else{
      try {
        let course = new Course({
            cname:req.body.cname,
            cdepartment:req.body.cdepartment
        })
        await course.save()
        res.status(201).json(course) 
      } catch (error) {
          res.status(422).json({message:error.message})
      }
    }
})

router.put("/put/:_id",[auth,valid],async(req,res)=>{
    try {
        const users = await User.findById({_id:req.user._id})
            let course=users.course.includes(req.params._id)
            if(course) return res.status(400).json('already taken')
            else
            {
                users.course.push(req.params._id)
                await users.save() 
                res.status(200).json(users) 
            }

    } catch (error) {
        res.status(422).json({message:error.message})
    }
  
})

router.put("/pop/:_id",[auth,valid],async(req,res)=>{
    try {
        let user = await User.findById({_id:req.user._id})
        let course = user.course.includes(req.params._id)
        if(!course) return res.status(404).json('course not found')
        else{
            user.course.pop(req.params._id)
            await user.save()
            res.status(200).json(user)
        }
    } catch (error) {
        res.status(422).json({message:error.message})
    }
})

router.get("/get/:_id",[auth], async(req,res)=>{
   try {
    let user = await User.findById(req.params._id).populate('course').select('-roles -created_at -password -cpassword -record')
    if(user){
        res.status(200).json(user)
    } else{
        res.status(400).json('Not found')
    }
   } catch (error) {
       res.status.json({message:error.message})
   }
})

router.delete("/remove/:_id",[valid,auth,admin],async(req,res)=>{
    try {
       let course = await Course.findByIdAndDelete({_id:req.params._id})
       if(course){
           res.status(200).json('course deleted !')
       } else{
           res.status(400).json('course not found')
       }
    } catch (error) {
        res.json({message:error.message})
    }
   })

module.exports = router;