const mongoose=require('mongoose')
const firmschema=new mongoose.Schema({
    firmname:{
        type:String,
        required:true,
        unique:true
    },
    area:{
        type:String,
        required:true
    },
    catagory:{
        type:[{
            type:String,
            enum:['veg','nonveg']
        }]
    },
    region:{
        type:[{
            type:String,
            enum:['Southindian','Northindian','chineese']
        }]
    },
    offer:{
        type:String,
    },
    image:{
        type:String,
    },
    vendor:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Vendor"
    }],
    product:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    }]

})
const Firm=mongoose.model('Firm',firmschema)
module.exports=Firm