const Vendor=require('../models/Vendor')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')
const dotEnv=require('dotenv')
dotEnv.config()
const secretkey=process.env.whatIsYourName
const VendorRegister= async (req,res)=>{
    const {username,email,password}=req.body
    try{
        const vendorEmail= await Vendor.findOne({email})
        if(vendorEmail){
            return res.status(400).json({message:"User email already exists"})
        }
        const hashedpassword= await bcrypt.hash(password,10)
        const newVendor = new Vendor({
            username,
            email,
            password:hashedpassword
        })
        await newVendor.save()
        res.status(201).json({message:"User Registered Successfully"})
        console.log("Registered Successfully")
    }
    catch(error){
       console.error(error)
       res.status(500).json({error:" Invalid details"})
    }
}

const VendorLogin= async (req,res)=>{
    const {email,password}=req.body
    try{
      const vendor= await Vendor.findOne({email})
      if(vendor && (await bcrypt.compare(password,vendor.password)))
      {
        const token=jwt.sign({vendorId:vendor._id},secretkey)
        res.status(201).json({message:"User Login Successfully",token})
        console.log(email,"this is my token",token)
      }
      else{
         res.status(401).json({message:"Invalid email or password"})
      }
    }
    catch(error){
       res.status(500).send(" it got an error")
    }
}

const getAllVendors= async (req,res)=>{
    try{
        const allvendors= await Vendor.find().populate('firm')
        return res.json({allvendors})
    }
    catch(error){
        console.log(error)
        return res.status(404).json({error:"vendor records not found"})
    }
}
const getSingleVendor=async (req,res)=>{
    const vendorId = req.params.prabhas
    try{
        const vendor=await Vendor.findById(vendorId)
        if(!vendor){
            return res.status(404).json({error:" Vendor not found"})
        }
        return res.status(201).json({vendor})
    }
    catch(error){
        console.log(error)
        return res.status(500).json({error:"Internal server error"})
    }
}
module.exports={VendorRegister,VendorLogin,getAllVendors,getSingleVendor}