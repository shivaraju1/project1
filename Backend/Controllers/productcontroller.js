const Product=require('../models/Product')
const Firm=require('../models/Firm')
const multer=require('multer')

const storage= multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'uploads/')
    },
    filename:function(req,file,cb){
        cb(null,Date.now() + path.extname(file.originalname))
    }
})
const upload=multer({storage:storage})

const addProducts= async(req,res)=>{
    try {

        const {productName,price,catagory,bestSeller,description}=req.body
        const image=req.file? req.file.filename:undefined
        const firmId=req.params.firmId
        const firm=await Firm.findById(firmId)
        if(!firm){
            return res.status(400).json({error:" firm not found"})
        }
        const newProduct= new Product({
            productName,
            price,
            catagory,
            image,
            bestSeller,
            description,
            firm:firm._id
        })
       const saveproduct= await newProduct.save()
       firm.product.push(saveproduct)
        await firm.save()
      return res.status(201).json({message:"Poduct is added Successfully"})
         
    } catch (error) {
        console.log(error)
        return res.status(500).json({error:"Internal server error"})
    }
}
const getProductsByFirm=async (req,res)=>{
    try {
        const firmId= req.params.firmId
        const firm= await Firm.findById(firmId)
        if(!firm){
            return res.status(404).json({error:" Firm is not found"})
        }
        const products= await Product.find({firm:firmId})
        return res.status(201).json({products})
    } catch (error) {
        console.log(error)
        return res.status(500).json({error:"Internal server error"})
    }
}
module.exports={addProducts:[upload.single('image'),addProducts],getProductsByFirm}