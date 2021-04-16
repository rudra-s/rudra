const mongoose = require('mongoose')
const valid = function(req,res,next){
    const validId =mongoose.Types.ObjectId.isValid(req.params._id)
    if(!validId)
    return res.status(400).json({message:'Invalid ID'})
    next()
}
module.exports = valid