const mongoose = require('mongoose');

const orderProductSchema = new mongoose.Schema({
    productId:{
        type:String,
        require:true
    },
    orderId:{
        type:String,
        require:true
    },
    quantity:{
        type:String,
        require:true
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

module.exports = mongoose.model('orderProducts',orderProductSchema);