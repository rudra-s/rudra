const express = require("express")
const User = require("../models/userSchema")
const Record = require("../models/update")
const auth = require("../middleware/auth")
const {check,validationResult} = require("express-validator")

const router = express.Router()

router.get("/me/:_id",async(req,res)=>{
    try {
        const user = await User.findById({_id:req.params._id}).select('-password -cpassword').populate('record')
        res.status(200).json(user)
    } catch (error) {
        res.status(422).json({message:error.message})
    }
})

router.post("/record",[
    check("dob").isString(),
    check("state").isString().isLength({min:4,max:30}),
    check("postcode").isNumeric(),
    check("country").isString().isLength({min:4,max:30}),
    check("xcgpa").isNumeric(),
    check("xpass").isNumeric(),
    check("xiicgpa").isNumeric(),
    check("xiipass").isNumeric(),   
],auth,async(req,res)=>{
    if(Object.keys(req.body).length!==8)
    return res.status(500).json('Failed')
    const error = validationResult(req)
    if(!error.isEmpty())
    res.status(422).json({message:error.message})
    else{
      try {
        let user = new Record({
            dob:req.body.dob,
            state:req.body.state,
            postcode:req.body.postcode,
            country:req.body.country,
            xcgpa:req.body.xcgpa,
            xpass:req.body.xpass,
            xiicgpa:req.body.xiicgpa,
            xiipass:req.body.xiipass
        })
        await user.save()
        res.status(201).json(user)
      } catch (error) {
          res.status(422).json({message:error.message})
      }  
    }

})
router.put("/:_id",auth, async (req, res) => {
    try{
    const records = await Record.findById(req.params._id)
    const users = await User.findById(req.user._id).select('-password')
            await records.save();
            users.record.push(records._id);
            await users.save();
            res.status(201).json(users); 
    } catch (error) {
        res.status(422).json({message:error.message})
    }
})

module.exports = router