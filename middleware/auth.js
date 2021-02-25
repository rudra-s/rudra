const jwt = require('jsonwebtoken')


const auth = async(req,res,next)=>{
    const pass = req.header('x-auth-token')
    if(!pass){
        res.status(400).json("Provide a token")
    } else{
        try {
            const decode = await jwt.verify(pass , process.env.SECRATE_KEY)
            req.user =decode.user
            next();
        } catch (error) {
            res.json(error)
        }
    }
}
module.exports = auth