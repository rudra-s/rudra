const express = require("express")
const mongoose = require("mongoose")
const Course = require("../models/courseSchema")
const {check,validationResult} = require('express-validator')
const auth = require("../middleware/auth")
const admin = require("../middleware/admin")
const superAdmin = require("../middleware/superAdmin")
const router = express()

router.get("/allcourse",auth,async(req,res)=>{
    try {
        const course = await Course.find({}).sort('cname')
        res.status(200).json(course)
    } catch (error) {
        res.status(422).json(error)
    } 
})

router.get("/:_id",auth,async(req,res)=>{
    try {
        var valid = mongoose.Types.ObjectId.isValid(req.params._id)
        if(valid){
        const course = await Course.findById(req.params._id)
        if(course){
            res.status(202).json(course)
        } else{
            res.status(404).json("Course not found or Id may be incorrect !")
        }
     } else{
         res.status(400).json("Opps ! try with a valid Id")
     } 
    } catch (error) {
        res.status(422).json(error)
    }
})

router.post("/",[
    check("cname","Provide a course name").isString().isLength({min:3,max:20}),
    check("cdepartment","Provide a department name").isString().isLength({min:4,max:20})
], [auth,superAdmin],async(req,res)=>{
    if(Object.keys(req.body).length!==2) return res.status(500).json("Opps ! There should be two field")
    const error = validationResult(req)
    if(!error.isEmpty()) return res.status(422).json({error})
    const course = await Course.findOne({cname:req.body.cname})
    if(course){
        res.status(422).json("Course is allready created !")
    } else{
        try {
            const course = new Course({
                cname:req.body.cname,
                cdepartment:req.body.cdepartment
            })
            await course.save()
            res.status(201).json("Course created successfully .")
        } catch (error) {
            res.status(422).json({error})
        }
    }

})

router.put("/:_id",[
    check("cname","Provide a course name").isString().isLength({min:3,max:20}),
    check("cdepartment","Provide a department name").isString().isLength({min:4,max:20})
], [auth,superAdmin],async(req,res)=>{
    if(Object.keys(req.body).length!==2) return res.status(500).json("Opps ! There should be two field")
    const error = validationResult(req)
    if(!error.isEmpty()){
     res.status(422).json({error})
    } else{
        try {
            const valid = mongoose.Types.ObjectId.isValid(req.params._id)
            if(!valid) return res.status(400).json("Invalid course Id")

            const course = await Course.findByIdAndUpdate({_id:req.params._id},{
                cname:req.body.cname,
                cdepartment:req.body.cdepartment
            },{new:true})
            await course.save()
            res.status(201).json("Course updated successfully .")
        } catch (error) {
            res.status(422).json({error:"check your course Id"})
        }
    }

})

router.delete("/remove/:_id",[auth,superAdmin],async(req,res)=>{
    try {
        var valid = mongoose.Types.ObjectId.isValid(req.params._id)
        if(valid){
        const course = await Course.findByIdAndDelete(req.params._id)
        if(course){
            res.status(202).json("Course deleted successfully !")
        } else{
            res.status(404).json("This course is not found or maybe Id is incorrect !")
        }
    } else{
        res.json("Opps ! try with valid Id")
    }
    } catch (error) {
        res.status(422).json({error:error})
    }
})
module.exports = router