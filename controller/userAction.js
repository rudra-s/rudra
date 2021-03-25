const express = require('express')
const User = require('../models/userSchema')
const auth = require("../middleware/auth")
const admin = require("../middleware/admin")
const superAdmin = require("../middleware/superAdmin")
const mongoose = require('mongoose')
const router = express.Router()

router.get("/users" ,[auth],async(req,res)=>{
    
   if(req.user.isAdmin && req.user.isSuperAdmin === false) return res.status(401).json("You are not authorized for getting whole user data")
    try {
        const page = req.query.page
        const limit = req.query.limit
        const start = (page-1)*limit
        const end = page*limit
        const user = await User.find({}).select('-password')
        const result = await user.slice(start,end)
        res.status(200).json(user)
    } catch (error) {
        res.status(422).json({error:error})
    }
})

router.get("/search" ,[auth] ,async(req,res)=>{
    try {
        const name = req.query.name
        const department = req.query.department
        const user = await User.find({'$or' :
        [{name:{$regex:`${name}`,$options:'i'}} , 
        {department:{$regex:`${department}`,$options:'i'}}
        ]
    })
        res.status(200).json(user) 
    
    } catch (error) {
        res.status(422).json(error)
    }
})

router.get("/me/:_id",[auth],async(req,res)=>{
   
    try {
        var valid = mongoose.Types.ObjectId.isValid(req.params._id)
        if(valid){
        const user = await User.findById(req.params._id)
        if(user){
            res.status(202).json(user)
        } else{
            res.status(404).json("User not found or Id may be incorrect !")
        }
     } else{
         res.status(400).json("Opps ! try with a valid Id")
     } 
    } catch (error) {
        res.status(422).json(error)
    }
})


router.delete("/remove/:_id",[auth],async(req,res)=>{
    try {
        var valid = mongoose.Types.ObjectId.isValid(req.params._id)
        if(valid){
        const user = await User.findByIdAndDelete(req.params._id)
        if(user){
            res.status(202).json("User deleted successfully !")
        } else{
            res.status(404).json("This user is not found or maybe Id is incorrect !")
        }
    } else{
        res.json("Opps ! try with valid Id")
    }
    } catch (error) {
        res.status(422).json({error:error})
    }
})


module.exports=router