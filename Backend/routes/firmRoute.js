const express= require('express')
const firmController=require('../Controllers/firmcontroller')
const verifyToken = require('../middlewares/verifyToken')
const Router=express.Router()
Router.post('/add-firm',verifyToken,firmController.addFirm)
module.exports=Router