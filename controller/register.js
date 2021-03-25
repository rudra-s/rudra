const express = require('express')
const {check , validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/userSchema')
const router = express.Router()
const accessTokenSecrete = process.env.accessTokenKey

router.post("/register",[
    check("name","Provide a valid name").isString().isLength({min:3 , max:128}),
    check("email","Provide a valid email").isEmail().isLowercase().isLength({min:11,max:141}),
    check("password","Provide a strong password").isAlphanumeric().isLength({min:6 , max:30}),
    check("cpassword","Provide a strong password").isAlphanumeric().isLength({min:6 , max:30}),
    check("department","Provide a department name").isString().isLength({min:3,max:30}),
    check("phone","Provide a valid number").isMobilePhone().isLength({min:10,max:10}),
    check("state","Provide a valid home address").isString().isLength({min:4,max:50}),
    check("code").isNumeric().isLength({min:2,max:10}),
    check("isAdmin").isBoolean(),
    check("isSuperAdmin").isBoolean()
], async(req,res)=>{
        if(Object.keys(req.body).length!=10){
           return res.status(500).json("Opps ! there should be 10 field")
        } 
            const error = validationResult(req)
            if(!error.isEmpty()){
             return res.status(422).json(error)
            } 
                const user = await User.findOne({email:req.body.email})
                if(user){
                  res.status(400).json("This email Id is allready registerd !")
                } else{
                try {
                    const password = req.body.password
                    const cpassword = req.body.cpassword
                    if(password===cpassword){
                     const user = new User({
                        name:req.body.name,
                        email:req.body.email,
                        password:password,
                        cpassword:cpassword,
                        department:req.body.department,
                        phone:req.body.phone,
                        isAdmin:req.body.isAdmin,
                        isSuperAdmin:req.body.isSuperAdmin
                    },
                      [{
                        state:req.body.state,
                        code:req.body.code
                     }])
                    const salt = await bcrypt.genSalt(15)
                    user.password = await bcrypt.hash(user.password , salt)
                    user.cpassword = await bcrypt.hash(user.cpassword,salt)
                    user.address.push({state:req.body.state , code:req.body.code})
                    await user.authTokenJwt()
                    await user.save()
                    res.status(201).json("User registerd successfully .")
                    } else{
                        res.status(422).json("Password does not match !")
                    }
                } catch (error) {
                    res.status(422).json(error)
                }
        
        }
})


router.put("/me/:_id",[
    check("name","Provide a valid name").isString().isLength({min:3 , max:128}),
    check("email","Provide a valid email").isEmail().isLowercase().isLength({min:11,max:141}),
    check("password","Provide a strong password").isAlphanumeric().isLength({min:6 , max:20}),
    check("cpassword","Provide a strong password").isAlphanumeric().isLength({min:6 , max:20}),
    check("department","Provide a department name").isString().isLength({min:3,max:30}),
    check("phone","Provide a valid number").isMobilePhone().isLength({min:10,max:10}),
    check("state","Provide a valid home address").isString().isLength({min:4,max:50}),
    check("code").isNumeric().isLength({min:2,max:10}),
    check("isAdmin").isBoolean(),
    check("isSuperAdmin").isBoolean()
], async(req,res)=>{
        if(Object.keys(req.body).length!=10){
           return res.status(500).json("Opps ! there should be 10 field")
        } 
            const error = validationResult(req)
            if(!error.isEmpty()){
             res.status(422).json(error)
            } else{
                try {
                    var valid = mongoose.Types.ObjectId.isValid(req.params._id) 
                    if(!valid)
                     return res.json("Opps ! try with a valid Id")
                     const password= req.body.password
                     const cpassword=req.body.cpassword
                     if(password===cpassword){
                       const user = await User.findByIdAndUpdate({_id:req.params._id},{
                        name:req.body.name,
                        email:req.body.email,
                        password:password,
                        cpassword:cpassword,
                        department:req.body.department,
                        phone:req.body.phone,
                        isAdmin:req.body.isAdmin,
                        isSuperAdmin:req.body.isSuperAdmin,   
                        state:req.body.state,
                        code:req.body.code,
                    },{new:true})
                    
                    const salt = await bcrypt.genSalt(15)
                    user.password = await bcrypt.hash(user.password , salt)
                    user.cpassword = await bcrypt.hash(user.cpassword , salt)
                    user.address.push({state:req.body.state , code:req.body.code})
                    await user.save()
                    res.status(204).json("User updated successfully .")
                } else{
                    res.status(422).json("Password does not match !")
                }
                } catch (error) {
                    res.status(422).json({error:"Please ! Check your Id "})
                }
            } 
})

router.post("/login",[
    check("email","Provide a valid Email").isEmail().isLength({min:11,max:140}).isLowercase(),
    check("password","Provide a strong password").isAlphanumeric().isLength({min:6,max:30})
],async(req,res)=>{
    if(Object.keys(req.body).length!=2)
    return res.status(500).json("Opps ! There should be 2 value")
    const error = validationResult(req)
    if(!error.isEmpty()){
    res.status(422).json(error)
    } else{
           const user = await User.findOne({email:req.body.email})
           if(!user) {
               res.status(401).json("This email Id is not registerd !")
           } else{
          try {
            const isMatch = await bcrypt.compare(req.body.password , user.password)
            if(!isMatch){
                res.status(401).json("Please ! Check your Password")
            } else{
                const token = await user.authTokenJwt()
                const accessToken = await jwt.sign({_id:user._id,isAdmin:user.isAdmin,isSuperAdmin:user.isSuperAdmin},
                    accessTokenSecrete,{expiresIn:'1d'})
               
                return res.status(201).json({accessToken })
            }
        }catch (error) {
         res.status(422).json(error)
        }
    }
 }
   
})

module.exports=router