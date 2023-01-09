const mongoose = require('mongoose');
const companyModel = require('./company-model');

const CategoryCompanySchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    image:{
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


module.exports = mongoose.model('categoryCompany',CategoryCompanySchema);

