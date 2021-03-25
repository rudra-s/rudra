
const superAdmin = (req,res,next)=>{
    if(!req.user.isSuperAdmin){
        res.status(403).json("You are not authorized !")
    } else{
        next()
    }
}
module.exports = superAdmin