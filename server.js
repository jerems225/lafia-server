require('dotenv').config();
const { MONGODB_USERNAME, MONGODB_PASSWORD } = process.env;
const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const mongoose = require('mongoose');

const mongodburl = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@lafiacluster.h8tgrke.mongodb.net/lafia_app?retryWrites=true&w=majority`


//routes
const userRoutes = require('./v1/routes/user-routes');
const authRoutes = require('./v1/routes/auth-routes');
const customerRoutes = require('./v1/routes/customer-routes');
const riderRoutes = require('./v1/routes/rider-routes');
const ownerRoutes = require('./v1/routes/owner-routes');

const app = express();

//Allow get all data in post request
app.use(bodyParser.json());

// connect database
mongoose.connect(mongodburl,{useNewUrlParser:true},(err)=>{
    if(err)
    {
        console.log('db connection failed...',err);
    }
    else
    {
        console.log('db connection success...');
    }
});

//register error logic
app.use((error,req,res,next) => {
    if(res.headerSent){
        return next(error);
    }
    res.status(error.code || 500).json({
        message : error.message || 'An unknown error occurred!'
    })
})
//register documentation endpoint
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//register routes
app.use('/api/v1/', userRoutes);

//login routes
app.use('/api/v1/', authRoutes);

//customers routes
app.use('/api/v1/', customerRoutes);

//rider routes
app.use('/api/v1/', riderRoutes);

//owner routes
app.use('/api/v1/', ownerRoutes);

const port = 5000;
app.listen(port);
