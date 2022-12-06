const mongoose = require('mongoose');

const WalletHistorySchema = new mongoose.Schema({
    libelle:{
        type:String,
        require:true
    },
    walletId:{
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

module.exports = mongoose.model('walletHistory',WalletHistorySchema);