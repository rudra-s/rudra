const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {check,validationResult}=require('express-validator')
const User = require('../models/userSchema')
const router = express.Router()

router.post("/user",[
    check("email","Write a valid email").isEmail().isLength({min:10,max:140}),
    check("password","Write a strong password").isAlphanumeric().isLength({min:6,max:30})
], async(req,res)=>{
   // console.log('hiii')
            const error = validationResult(req)
            if(!error.isEmpty()){
                res.status(400).json(error)
            } else{
                if(Object.keys(req.body).length!==2){
                    res.status(422).json("Opps ! There should be 2 field")
                } else{
                    let user = await User.findOne({email:req.body.email})
                    if(!user){
                      res.status(400).json("User is allready login")
                }
                 else{
                try {
                    const validPass = await bcrypt.compare(req.body.password , user.password)
                    if(!validPass){
                        res.status(401).json("Check email or password")
                    } else{
                      
                        const token = await jwt.sign({_id:user._id}, process.env.SECRATE_KEY)
                        res.json(token)
                    }
                } catch (error) {
                    res.json(error)
                }
            }
        }
       } 
})
module.exports = router