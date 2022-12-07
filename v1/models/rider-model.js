const mongoose = require('mongoose');

const riderSchema = new mongoose.Schema({
    lastName:{
        type:String,
        require:true
    },
    firstName:{
        type:String,
        require:true
    },
    idCard:{
        type:String,
        require:true
    },
    driverLicense:{
        type:String,
        require:true
    },
    profilImage:{
        type:String,
        require:true
    },
    cvFile:{
        type:String,
        require:true
    },
    letterFile:{
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