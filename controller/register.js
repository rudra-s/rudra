const express = require("express")
const User = require("../models/userSchema")
const valid = require("../middleware/validId")
const auth = require("../middleware/auth")
const admin = require("../middleware/admin")
const {check,validationResult} = require("express-validator")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const multer = require('multer')
const router = express.Router()

var storage = multer.diskStorage({
    destination: (req,file,callback) => {
      callback (null, '/client/public/upload')
    },
    filename:(req,file,callback)=>{
        callback(null ,file.originalname)
    }
})

const upload = multer({storage:storage})


router.get("/users",async(req,res)=>{
    try {
        const user = await User.find({}).select('-password -cpassword  -__v -created_at')
        res.status(200).json(user)
    } catch (error) {
        res.status(422).json({message:error.message})
    }
  
})


router.get("/users/:_id",async(req,res)=>{
    try {
        const user = await User.findById({_id:req.params._id}).select('-password -cpassword -__v -created_at')
        res.status(200).json(user)
    } catch (error) {
        res.status(422).json({message:error.message})
    }
  
})

router.get("/search",async(req,res)=>{
    try {
        let searchName=req.query.name
        let searchEmail = req.query.email
        let searchDept = req.query.department
        let search = await User.find({'$or':[
            {name:{$regex:`${searchName}`,$option:'i'}},
            {email:{$regex:`${searchEmail}`,$option:'i'}},
            {department:{$regex:`${searchDept}`,$option:'i'}}
        ]}) 
        res.status(200).json(search)
    } catch (error) {
        res.status(422).json({message:error.message})
    }
})

router.post("/register",upload.single('photo'),[
    check("name").isString().isLength({min:4,max:50}),
    check("email").isEmail().isLength({min:11,max:50}).isLowercase(),
    check("password").isAlphanumeric().isLength({min:5,max:20}),
    check("cpassword").isAlphanumeric().isLength({min:5,max:20}),
    check("department").isString().isLength({min:4,max:20}),
    check("phone").isNumeric().isMobilePhone(),
    check("roles").isAlpha(),
    check("photo").isString()
], async(req,res)=>{
    // if(Object.keys(req.body).length!==7)
    // return res.status(500).json('Failed')
    const error = validationResult(req)
    if(!error.isEmpty())
    return res.status(422).json({message:error.message})

    let user = await User.findOne({email:req.body.email})
    if(user){
    res.status(400).json('Access denied')
    } else{
        try {
            const password=req.body.password
            const cpassword= req.body.cpassword
            const roles = req.body.roles
            if(password===cpassword){
            let user = new User({
                name:req.body.name,
                email:req.body.email,
                photo:req.file.originalname,
                password:password,
                cpassword:cpassword,
                phone:req.body.phone,
                department:req.body.department,
                roles:roles
            })
            const salt = await bcrypt.genSalt(15)
            user.password = await bcrypt.hash(user.password,salt)
            user.cpassword = await bcrypt.hash(user.cpassword,salt)
            await user.save()
             let token = await jwt.sign({_id:user._id,roles:user.roles},process.env.accessTokenKey)
             res.header("x-api-key",token)
            .header("access-control-expose-headers","x-api-key")
            .status(201).json(user)
            }
              else{
            res.status(400).json('Access denied')
        }
        } catch (error) {
            res.status(422).json({message:error.message})
        }
    }

})

router.put("/update/:_id",[
    check("name").isString().isLength({min:4,max:50}),
    check("email").isEmail().isLength({min:11,max:50}).isLowercase(),
    check("department").isString().isLength({min:4,max:20}),
    check("phone").isNumeric().isMobilePhone(),
], [valid,auth], async(req,res)=>{
    const error = validationResult(req)
    if(!error.isEmpty()){
     res.status(422).json({message:error.message})
    } else{
        try {
            const user = await User.findByIdAndUpdate(req.params._id,{
                name:req.body.name,
                email:req.body.email,
                phone:req.body.phone,
                department:req.body.department,
            },{new:true})
            await user.save()
            res.status(200).json(user) 
        } catch (error) {
            res.status(422).json({message:error.message})
        }
    }
       
})

router.post("/login",[
    check("email").isEmail().isLength({min:11,max:50}).isLowercase(),
    check("password").isAlphanumeric().isLength({min:5,max:20}),
], async(req,res)=>{
    if(Object.keys(req.body).length!==2)
    return res.status(500).json('Failed')
    const error = validationResult(req)
    if(!error.isEmpty())
    return res.status(422).json({message:error.message})

    let user = await User.findOne({email:req.body.email})
    if(!user){
    res.status(400).json('Access denied')
    } else{
        try {
          const isMatch = await bcrypt.compare(req.body.password,user.password)
          if(!isMatch) return res.status(401).json('Unauthorized')
          let token = await jwt.sign({_id:user._id,roles:user.roles},process.env.accessTokenKey)
         res.status(201).json({_id:user._id,roles:user.roles,token})
        } catch (error) {
            res.status(422).json({message:error.message})
        }
    }

})

router.delete("/remove/:_id",[valid,auth,admin],async(req,res)=>{
 try {
    let user = await User.findByIdAndDelete({_id:req.params._id})
    if(user){
        res.status(200).json('user deleted !')
    } else{
        res.status(400).json('user not found')
    }
 } catch (error) {
     res.json({message:error.message})
 }
})

module.exports = router