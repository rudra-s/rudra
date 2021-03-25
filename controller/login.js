const express = require("express")
const mongoose = require("mongoose")
const User = require("../models/userSchema")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const {check,validationResult} = require("express-validator")
const router = express.Router()
const accessTokenSecrete = process.env.accessTokenKey



// router.post("/token",async(req,res)=>{
//     var {token} = req.body
//     if(!token){
//         return res.status(401).json("provide a token")
//     }
//     if(refreshTokens.includes(token)){
//         return res.status(403).json("you are not authorized")
//     }
//     await jwt.verify(token , refreshTokenSecrete, async (err,user)=>{
//         if(err){
//             return res.status(403).json("Access failed")
//         }
//         const accessToken= await jwt.sign({_id:user._id},accessTokenSecrete,{expiresIn:'1d'})
//         res.status(201).json({
//             accessToken
//         })
//     })
// })

// router.post("/logout/",async(req,res)=>{
//      var {token} = req.body
//     refreshTokens = await refreshTokens.filter(token=>token!==token)
//     res.status(200).json("User is logd out")
// })

module.exports = router