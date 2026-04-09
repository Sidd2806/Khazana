const mongoose= require("mongoose")


const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    price:{
        type:Number
    },
    countInStock:{
        type:Number,
        required:true,
        default:0
    },
    sku:{
        type:String,
        required:true,
        unique:true
    },
    category:{
        type:String,
        required:true,
    },
    brand:{
        type:String,
    },
    brand:{
        type:[String],
        required:true,
    },
})