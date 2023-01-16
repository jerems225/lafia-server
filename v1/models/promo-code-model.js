const mongoose = require('mongoose');

const promoCodeSchema = new mongoose.Schema({
    code: {
        type:String,
        require:true
    },
    promoPercent:
    {
        type: Number,
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

module.exports = mongoose.model('promoCodes',promoCodeSchema);