const express = require("express")
const Product= require("../model/Product")
const {protect,admin}=require("../Middleware/authMiddleware")
const { formatProductImages } = require("../utils/formatImageUrl");

const router= express.Router()

// @route /api.admin/products
//@des Get all the products (admin only)
// @access ADMIN/admin

router.get("/",protect,admin,async(req,res)=>{
    try {
        const products = await Product.find({})
        res.json(formatProductImages(products))
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Server Eroor"})
        
    }
})

module.exports=router