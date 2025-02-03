const Vendor=require('../models/Vendor')
const jwt=require('jsonwebtoken')
const dotEnv=require('dotenv')
dotEnv.config()
const secretkey=process.env.whatIsYourName
const verifyToken= async (req,res,next)=>{
    const token= req.headers.token
    if(!token){
        res.status(401).json({message:'Token is required'})
    }
    try{
         const decode=jwt.verify(token,secretkey)
         const vendordt= await Vendor.findById(decode.vendorId)
         if(!vendordt){
            res.status(404).json({error:'Vendor is not found'})
         }
         req.vendorId=vendordt._id
         next()
    }
    catch(error){
        console.log(error)
       res.status(500).json({error:'Token is not found'})
    }
}
module.exports=verifyToken