const mongoose = require('mongoose');

const orderProductSchema = new mongoose.Schema({
    productId:{
        type:String,
        require:true
    },
    product:{
        type: Object,
        require:true
    },
    quantity:{
        type:Number,
        require:true
    },
    cartId:{
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