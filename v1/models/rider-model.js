const mongoose = require('mongoose');

const riderSchema = new mongoose.Schema({
    idCardFront:{
        type:String,
        require:false
    },
    idCardBack:{
        type:String,
        require:false
    },
    driverLicenseFront:{
        type:String,
        require:true
    },
    driverLicenseBack:{
        type:String,
        require:true
    },
    profileImage:{
        type:String,
        require:true
    },
    status: {
        type:String,
        require:true
    },
    userId:{
        type:String,
        require:true
    },
    riderDeviceTokens: {
        type:Array,
        require: false
    },
    isOnline: {
        type: Boolean,
        default: false,
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

module.exports = mongoose.model('riders',riderSchema);