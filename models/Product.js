const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        min:6
    },
    desc:{
        type:String,
        required:true,
        min:8
    },
    category:{
        type:String,
        required:true
    },
    img: {
        type: String,
        required: true,
    },
    price:{
        type:Number,
        required:true
    },
    
    review:{
        type:Number,
        required:true
    }
})

module.exports = mongoose.model("Product",productSchema)