const mongoose = require('mongoose');

const UserDoubleFactorSchema = new mongoose.Schema(
    {
        doubleFactorCode: {
            type:Number,
            require:true
        },
        dateExpired:{
            type:Date,
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
    }
);

module.exports = mongoose.model('userDoubleFactor',UserDoubleFactorSchema);