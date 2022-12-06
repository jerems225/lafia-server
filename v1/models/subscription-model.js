const mongoose = require('mongoose');

const SubscriptionSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    dateExpired:{
        type:Date,
        require:true
    },
    amount:{
        type:Number,
        require:true
    },
    customerId: {
        type:String,
        require:false
    },
    ownerId:{
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

module.exports = mongoose.model('subscriptions',SubscriptionSchema);