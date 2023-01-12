const mongoose = require('mongoose');

const ownerSchema = new mongoose.Schema({
    lastName:{
        type:String,
        require:true
    },
    firstName:{
        type:String,
        require:true
    },
    address:{
        type:String,
        require:true
    },
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