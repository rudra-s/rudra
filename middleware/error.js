const error = async(req,res)=>{
    res.status(500).json("something failed !!")
}

module.exports = error