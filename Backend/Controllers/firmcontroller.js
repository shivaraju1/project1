const Vendor=require('../models/Vendor')
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

const addFirm= async (req,res)=>{
    try{
        const {firmname,area,catagory,region,offer} = req.body
        const image=req.file? req.file.filename:undefined
        const vendor= await Vendor.findById(req.vendorId)
        if(!vendor){
            res.status(400).json({message:'Vendor not found'})
        }
        const newfirm = new Firm({
            firmname,area,catagory,region,offer,image,vendor:vendor._id
        })
       const savedFirm= await newfirm.save()
       vendor.firm.push(savedFirm)
       await vendor.save()
        res.status(200).json({message:'Firm added Successfully'})
    }
    catch(error){
        res.status(500).json({error:'Internal server error'})
    }
}
module.exports={addFirm:[upload.single('image'),addFirm]}