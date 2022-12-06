const mongoose = require('mongoose');

const DeliverySchema = new mongoose.Schema({
    deliveryCode:{
        type:String,
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
    orderId: {
        type:String,
        require:false
    },
    riderId:{
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

module.exports = mongoose.model('delivery',DeliverySchema);