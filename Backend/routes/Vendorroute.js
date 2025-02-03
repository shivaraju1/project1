const VendorController=require('../Controllers/Vendorcontroller')
const express=require('express')
const Router=express.Router()
Router.post('/register',VendorController.VendorRegister)
Router.post('/login',VendorController.VendorLogin)
Router.get('/all-vendors',VendorController.getAllVendors)
Router.get('/single-vendor/:prabhas',VendorController.getSingleVendor)
module.exports=Router
