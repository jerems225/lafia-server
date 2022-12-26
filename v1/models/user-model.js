const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        email:{
            type:String,
            required:false
        },
        password:{
            type: String,
            require:true
        },
        phone:{
            type:String,
            require:false,
        },
        roles:{
            type:Array,
            require:true
        },
        referalCode: {
            type:String,
            require:true
        },
        verifyCode: {
            type:Number,
            require:false
        },
        secretCode: {
            type:Number,
            require:false
        },
        referrer: {
            type:String,
            require:false
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

module.exports = mongoose.model('users',userSchema);