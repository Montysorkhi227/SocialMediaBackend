const jwt=require('jsonwebtoken')
const User=require('../models/User')
const authMiddleware=async(req,res,next)=>{
    const authHeader=req.headers.authorization;
    if(!authHeader||!authHeader.startsWith("Bearer"))
    {
        return res.status(401).json({message:"No Token, Acess Denied"})
    };
    const token=authHeader.split(" ")[1];
    try{
        const decoded=jwt.verify(token,process.env.SECRET_KEY)
        req.user=await User.findById(decoded.id).select("-password");
        next();

    }
    catch(error)
    {
        return res.status(500).json({ 
            message:"Invalid Token"
        })
    }
}
module.exports=authMiddleware;