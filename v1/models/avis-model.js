const mongoose = require('mongoose');

const AvisSchema = new mongoose.Schema({
    mark:{
        type:Number,
        require:true
    },
    comment:{
        type:String,
        require:true
    },
    customerId:{
        type:String,
        require:true
    },
    riderId: {
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

module.exports = mongoose.model('avis',AvisSchema);