const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');


//routes
const userRoutes = require('./v1/routes/user-routes');
const app = express();

//register documentation endpoint
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//register routes
app.use('/api/v1/',userRoutes);

const port = 5000;
app.listen(port);
