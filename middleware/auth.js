const jwt = require("jsonwebtoken")
const auth = async(req,res,next)=>{
    const token = req.header('x-api-key')
    if(!token){
        return res.status(403).json("Provide a token ")
    }
    try {
        const valid = await jwt.verify(token , process.env.accessTokenKey)
        if(!valid){
         res.status(401).json("you are not authorized")
        } else{
            req.user = valid
            next()
        }
    } catch (error) {
        res.status(422).json(error)
    }
}

module.exports=auth