require('dotenv').config();
const { PROD_CONNECTION_STRING, LOCAL_CONNECTION_STRING, MONGODB_ENV } = process.env;
const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const mongoose = require('mongoose');
let mongodburl = "";

if (MONGODB_ENV == "dev") {
    mongodburl = LOCAL_CONNECTION_STRING;
}
else if (MONGODB_ENV == "prod") {
    mongodburl = PROD_CONNECTION_STRING;
}

// connect database
mongoose.connect(mongodburl, { useNewUrlParser: true }, (err) => {
    if (err) {
        console.log('db connection failed...', err);
    }
    else {
        console.log('db connection success...');
    }
});


//routes
const userRoutes = require('./v1/routes/user-routes');
const authRoutes = require('./v1/routes/auth-routes');
const customerRoutes = require('./v1/routes/customer-routes');
const riderRoutes = require('./v1/routes/rider-routes');
const ownerRoutes = require('./v1/routes/owner-routes');
const companyRoutes = require('./v1/routes/company-routes');
const categoryCompanyRoutes = require('./v1/routes/category-company-routes');
const categoryProductRoutes = require('./v1/routes/category-product-routes');
const productRoutes = require('./v1/routes/product-routes');


const app = express();

//Allow get all data in post request
app.use(bodyParser.json());


//register error logic
app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500).json({
        message: error.message || 'An unknown error occurred!'
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

//company routes
app.use('/api/v1/', companyRoutes);

//category company routes
app.use('/api/v1/', categoryCompanyRoutes);

//category product routes
app.use('/api/v1/', categoryProductRoutes);

//product routes
app.use('/api/v1/', productRoutes);

const port = 5000;
app.listen(port);
