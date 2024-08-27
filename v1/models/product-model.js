const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    images:{
        type:Array,
        require:false
    },
    price: {
        type:Number,
        require:false
    },
    deliveryCost: {
        type:Number,
        require: false
    },
    makingTime:{
        type:String,
        require:true
    },
    categoryProductId:{
        type:String,
        require:true
    },
    isAvailable: {
        type: Boolean,
        required: true
    },
    createdAt:{
        type:Date,
        require:true
    },
    updatedAt:{
        type:Date,
        require:false
    }
});

module.exports = mongoose.model('products',productSchema);