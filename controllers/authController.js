const User=require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
exports.register=async(req,res)=>{
    const {username,email,password}=req.body
    try {
       const userExits=await User.findOne({email});
       if(userExits){
        return res.status(400).json({msg:"User already exists"})
        }
        const hashedPassword=await bcrypt.hash(password,10);
        const newUser=await User.create({
            username,
            email,
            password:hashedPassword
            })
            res.status(200).json({message:"User Registered Sucessfully"})
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message:"An Error Occured"})}
       
        

}
exports.login=async(req,res)=>{
    const {email,password}=req.body
    try {
        const user=await User.findOne({email})
        if(!user){
            return res.status(400).json({message:"User does not exist"})
            }
            const isMatch=await bcrypt.compare(password,user.password)
            if(!isMatch){
                return res.status(400).json({message:"Invalid Password"})
                }
                const token=jwt.sign({id:user._id},process.env.SECRET_KEY,{expiresIn:'1d'})
                    res.status(200).json({token})
    }
    catch(err){
        res.status(500).json({message:"An Error Occured"})}
    }
    