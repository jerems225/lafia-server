const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
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
        role:{
            type:String,
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