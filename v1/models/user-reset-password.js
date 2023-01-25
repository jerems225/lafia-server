const mongoose = require('mongoose');

const userResetSchema = new mongoose.Schema(
    {
        userId: {
            type:String,
            require: false
        },
        resetCode: {
            type: String,
            require:true,
            trim: true
        },
        createdAt:{
            type:Date,
            require:true,
            expires: 60
        }
    }
);

module.exports = mongoose.model('userResetPassword',userResetSchema);