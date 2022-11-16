const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        email:{
            type:String,
            required:true
        },
        password:{
            type: String,
            require:true
        },
        phone:{
            type:String,
            require:true,
        },
        roles:{
            type:Array,
            require:true
        },
        referalCode: {
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

module.exports = mongoose.model('users',userSchema);