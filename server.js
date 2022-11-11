const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');


//routes
const userRoutes = require('./v1/routes/user-routes');
const HttpError = require('./v1/models/http-error');
const app = express();

//Allow get all data in post request
app.use(bodyParser.json());

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
app.use('/api/v1/',userRoutes);

const port = 5000;
app.listen(port);
