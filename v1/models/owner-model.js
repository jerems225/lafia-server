const mongoose = require('mongoose');

const ownerSchema = new mongoose.Schema({
    idCardFront:{
        type:String,
        require:false
    },
    idCardBack:{
        type:String,
        require:false
    },
    userId:{
        type:String,
        require:true
    },
    ownerDeviceTokens: {
        type:Array,
        require: false
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

module.exports = mongoose.model('owners',ownerSchema);