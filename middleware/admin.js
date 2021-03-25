const admin =(req,res,next)=>{
    if(!req.user.isAdmin){ 
     res.status(403).json("You are not authorized !")
    }else{
    next()
    }
}
module.exports=admin
