const express = require('express')
const mongoose = require('mongoose')
const {check,validationResult}=require('express-validator')
const Book = require('../models/bookSchema')
const auth = require("../middleware/auth")
const router = express.Router()

try {
    router.get("/",async(req,res)=>{
        // const pages = req.query.pages
        // const limit = req.query.limit
        // const start = (pages-1)*limit
        // const end = pages*limit
        const book = await Book.find({}).sort('title')
        //const result = await book.slice(start,end)
        res.status(200).json(book)
    })   
} catch (error) {
    res.json(error)
}

router.post("/",[
    check("title","Write a valid book name").isLength({min:3,max:133}),
    check("author","Write a valid author name").isAlpha().isLength({min:3,max:130}),
    check("published").isBoolean(),
    check("dept","Write dept name").isLength({min:2,max:50}).isAlpha()
], auth, async(req,res)=>{
    let book = await Book.findOne({title:req.body.title})
    if(book){
        res.status(400).json("Book is allready created")
    } else{
        if(Object.keys(req.body).length!==4){
            res.status(422).json('Opps ! There should be 4 field ')
        } else{
            const error = validationResult(req)
            if(!error.isEmpty()){
                res.status(400).json(error)
            } else{ 
                try {
                    const book = new Book({
                        title:req.body.title,
                        author:req.body.author,
                        published:req.body.published,
                        dept:req.body.dept
                    })
                    await book.save()
                    res.status(202).json("Book is created Successfully")
                } catch (error) {
                    res.json(error)
                }
            }
        }
    }
})

router.put("/:_id",[
    check("title","Write a valid book name").isLength({min:3,max:133}),
    check("author","Write a valid author name").isAlpha().isLength({min:3,max:130}),
    check("published").isBoolean(),
    check("dept","Write dept name").isLength({min:2,max:50}).isAlpha()
], auth, async(req,res)=>{
    const error = validationResult(req)
    if(!error.isEmpty()){
        res.status(400).json(error)
    }
       
      else{
            if(Object.keys(req.body).length!==4){
                res.status(422).json('Opps ! There should be 4 field ')
            }
           else{ 
                try {
                    const book = await Book.findByIdAndUpdate(req.params._id ,{
                        title:req.body.title,
                        author:req.body.author,
                        published:req.body.published,
                        dept:req.body.dept
                    },{new:true})
                    await book.save()
                    res.status(200).json("Book is updated Successfully")
                } catch (error) {
                    res.json("Opps ! Try with valid book Id")
                }
            }
        }
})

try {
    router.delete("/:_id",async(req,res)=>{
        var valid = mongoose.Types.ObjectId.isValid(req.params._id)
        if(valid){
        const book = await Book.findByIdAndRemove(req.params._id)
        if(book){
            res.status(200).json("Book is deleted successfully")
        } else{
            res.status(204).json()
        }
    } else{
        res.status(404).json("Opps ! Try with valid book Id")
    }
    })
      
} catch (error) {
    res.json(error)
}

try {
    
    router.get("/:_id",async(req,res)=>{
     var valid = mongoose.Types.ObjectId.isValid(req.params._id)
      if( valid ) {
        const book = await Book.findById(req.params._id)
        res.status(200).json(book)
      } else{
        res.status(404).json("Opps ! Try with valid book Id")
      }
    })
}catch(error){
    res.json(error)
}
module.exports = router