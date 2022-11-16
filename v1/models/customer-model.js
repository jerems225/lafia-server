const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
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

module.exports = mongoose.model('customers',customerSchema);

