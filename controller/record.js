const express = require("express")
const mongoose = require("mongoose")
const {check , validationResult} = require("express-validator")
const Record = require("../models/studentRecord")
const auth = require("../middleware/auth")
const admin = require("../middleware/admin")
const router = express.Router()

router.post("/student/record",[
    check("dob","Provide date of birth year/month/day !").isString(),
    check("status","Provide the student's status").isAlpha().isLength({min:4,max:10}),
    check("submark","Provide student's marks").isNumeric().isLength({min:1,max:2}),
    check("grade","Provide a grade to student").isString().isLength({min:1,max:2})
],[auth,admin],async(req,res)=>{
    if(Object.keys(req.body).length!==4) return res.status(500).json("Opps ! there should be 4 feild")
    const error = validationResult(req)
    if(!error.isEmpty()) return res.status(422).json({error})
    try {
        const record = new Record({
            dob:req.body.dob,
            status:req.body.status,
        },[{
            submark:req.body.submark,
            grade:req.body.grade
        }])
        record.marks.push({submark:req.body.submark , grade:req.body.grade})
        await record.save()
        res.status(201).json('record created successfully !')
    } catch (error) {
        res.status(422).json({error})
    }
})

router.put("/student/record/:_id",[
    check("dob","Provide date of birth year/month/day !").isString(),
    check("status","Provide the student's status").isAlpha().isLength({min:4,max:10}),
    check("submark","Provide student's marks").isNumeric().isLength({min:1,max:2}),
    check("grade","Provide a grade to student").isString().isLength({min:1,max:2})
],[auth,admin],async(req,res)=>{
    const valid = mongoose.Types.ObjectId.isValid(req.params._id)
    if(!valid) return res.status(422).json("Check your courseId !")
    if(Object.keys(req.body).length!==2) return res.status(500).json("Opps ! there should be 2 feild")
    const error = validationResult(req)
    if(!error.isEmpty()) return res.status(422).json({error})
    try {
        const record = await Record.findByIdAndUpdate(req.params._id,{
            dob:req.body.dob,
            submark:req.body.submark,
            grade:req.body.grade,
            status:req.body.status
        },{new:true})
        record.marks.push({submark:req.body.submark , grade:req.body.grade})
        await record.save()
        res.status(201).json("record updated successfully !")
    } catch (error) {
        res.status(422).json({error})
    }
})

router.delete("/remove/:_id",async(req,res)=>{
    const valid = mongoose.Types.ObjectId.isValid(req.params._id)
    if(!valid) return res.status(422).json("Invalid record Id")
    try {
    const record = await Record.findByIdAndDelete(req.params._id)
    if(record){
        res.status(200).json("record has deleted !")
    } else{
        res.status(400).json("record is deleted or Id maybe incorrect")
    }
  } catch (error) {
      res.status(422).json({error})
  }
})

module.exports = router