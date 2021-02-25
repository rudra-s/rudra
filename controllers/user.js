const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const {check,validationResult}=require('express-validator')
const User = require('../models/userSchema')
const Book = require('../models/bookSchema')
const router = express.Router()

try {
    router.get("/",async(req,res)=>{
      /*   const pages = req.query.pages
        const limit = req.query.limit
        const start = (pages-1)*limit
        const end = pages*limit */
        const user = await User.find({}).sort('user').select('-password')
       // const result = await user.slice(start,end)
        res.status(200).json(user)
    })
} catch (error) {
    res.json(error)
}

router.post("/",[
    check("user","Write a valid name").isAlpha().isLength({min:3,max:133}),
    check("email","Write a valid email").isEmail().isLength({min:10,max:140}),
    check("password","Write a strong password").isAlphanumeric().isLength({min:6,max:30})
], async(req,res)=>{
    let user = await User.findOne({email:req.body.email})
    if(user){
        res.status(400).json("User is allready registerd")
    } else{
        if(Object.keys(req.body).length!==3){
            res.status(422).json('Opps ! There should be 3 field ')
        } else{
            const error = validationResult(req)
            if(!error.isEmpty()){
                res.status(400).json(error)
            } else{
                try {
                    const user = new User({
                        user:req.body.user,
                        email:req.body.email,
                        password:req.body.password
                    })
                    const salt = await bcrypt.genSalt(15)
                    user.password = await bcrypt.hash(user.password , salt)
                    const token = await jwt.sign({_id:user._id},process.env.SECRATE_KEY)
                    await user.save()
                   
                    res.status(202).json("User registerd Successfully")
                } catch (error) {
                    res.json(error)
                }
            }
        }
    }
})

try {
    router.post("/:_id", async (req, res) => {
        const user = await User.findOne({ _id: req.params._id});
        const books = new Book();
        books.title = req.body.title;
        books.author=req.body.author,
        books.published=req.body.published,
        books.dept=req.body.dept
      
        books.user = user._id
        await books.save();
        user.book.push(books._id);
        await user.save();
      
        res.json(books); 
    });
} catch (error) {
    res.json(error)
}

try {
    router.get("/:_id",async(req,res)=>{
        const user = await User.findById(req.params._id).select('-password') .populate('book').exec(function(err,user){
            if(err) console.log(err)
            else{
                res.json(user)
            }
        })
   
    })   
} catch (error) {
    res.json(error)
}
 
module.exports = router