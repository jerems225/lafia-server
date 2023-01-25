const mongoose = require('mongoose');

const UserDoubleFactorSchema = new mongoose.Schema(
    {
        doubleFactorCode: {
            type:Number,
            require:true
        },
        userId:{
            type:String,
            require:true
        },
        createdAt:{
            type:Date,
            require:true,
            expires: 60
        }
    }
);

module.exports = mongoose.model('userDoubleFactor',UserDoubleFactorSchema);