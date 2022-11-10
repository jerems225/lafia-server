const express = require('express');
const bodyParser = require('body-parser');

//routes
const userRoutes = require('./v1/routes/user-routes');
const app = express();

//register routes
app.use('/api/v1/',userRoutes);

const port = 5000;
app.listen(port);
