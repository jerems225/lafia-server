const mongoose = require('mongoose');

const WalletSchema = new mongoose.Schema({
    balance:{
        type:Number,
        require:true
    },
    companyId:{
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

module.exports = mongoose.model('wallets',WalletSchema);