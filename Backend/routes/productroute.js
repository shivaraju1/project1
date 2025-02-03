const productController=require('../Controllers/productcontroller')
const express=require('express')
const Router=express.Router()
Router.post('/add-product/:firmId',productController.addProducts)
Router.get('/:firmId/getproducts',productController.getProductsByFirm)
module.exports=Router