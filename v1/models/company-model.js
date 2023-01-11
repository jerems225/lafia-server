const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    location:{
        type:String,
        require:true
    },
    country:{
        type:String,
        require:true
    },
    city:{
        type:String,
        require:true
    },
    department:{
        type:String,
        require:true
    },
    image: {
        type:String,
        require:false
    },
    status:{
        type:String,
        require:true
    },
    ownerId:{
        type:String,
        require:true
    },
    categoryCompanyId:{
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

module.exports = mongoose.model('company',CompanySchema);

