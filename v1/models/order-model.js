const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderRef:{
        type:String,
        require:true
    },
    customerId:{
        type:String,
        require:true
    },
    products: {
        type: Array,
        require: true
    },
    amount: {
        type: Number,
        require: true
    },
    deliveriesAmount: {
        type: Number,
        require: true
    },
    orderPromoCode: {
        type: String,
        require: true
    },
    deliveryCode:{
        type:String,
        require:true
    },
    deliveryLocation:{
        type:Object,
        require:true
    },
    deliveryMark:{
        type:Number,
        require:false
    },
    driverCollectOrder:{
        type:Boolean,
        require:true
    },
    status:{
        type:String,
        require:true
    },
    companyId:{
        type:String,
        require:true
    },
    riderId:{
        type:String,
        require:false
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