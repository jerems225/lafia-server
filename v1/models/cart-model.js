const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    customerId:{
        type:String,
        require:true
    },
    isValidated:{
        type:Boolean,
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

module.exports = mongoose.model('Carts',cartSchema);