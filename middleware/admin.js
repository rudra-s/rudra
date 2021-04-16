const admin =(req,res,next)=>{
    if(req.user.roles!=='admin'){ 
     res.status(403).json({message:"access denied !!"})
    }else{
    next()
    }
}
module.exports=admin
