const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    libelle:{
        type:String,
        require:true
    },
    orderNum:{
        type:Number,
        require:true
    },
    customerId:{
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

module.exports = mongoose.model('orders',orderSchema);