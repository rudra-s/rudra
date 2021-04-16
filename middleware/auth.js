const jwt = require("jsonwebtoken")
const dotenv = require('dotenv')

dotenv.config();
const auth = async(req,res,next)=>{
    const token = req.header('x-api-key')
    //const token = req.cookies.token
    if(!token){
        return res.status(403).json({message:'not authorized !'})
    }
    try {
        const valid = await jwt.verify(token , process.env.accessTokenKey)
        if(!valid){
         res.status(401).json({message:"access denied"})
        } else{
            req.user = valid
            next()
        }
    } catch (error) {
        res.status(422).json(error)
    }
}

module.exports=auth