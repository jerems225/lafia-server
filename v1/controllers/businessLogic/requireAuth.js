require('dotenv').config()
const { JWT_SECRET_APP } = process.env;
const jwt = require('jsonwebtoken');

function requireAuth(req, res, next)
{
    if(req)
    {
        if (!req.headers || !req.headers.authorization) {
            return res.status(401).send({
                  status: 401,
                  message: 'No authorization headers, you needs to pass the jwt token as authorization params.',
                  data: null
              });
          }
      
          const tokenBearer = req.headers.authorization.split(' ');
          if (tokenBearer.length != 2) {
            return res.status(401).send({
                  status: 401,
                  message: 'Malformed token, make sure you add bearer in front of the token',
                  data: null
              });
          }
      
          const token = tokenBearer[1];
          return jwt.verify(token, JWT_SECRET_APP, (err, decoded) => {
            if (err) {
              return res.status(500).send({
                  status: 500,
                  message: 'Failed to authenticate.',
                  data : {
                      authentication: false
                  }
              });
            }
            return next();
          });
    }
    
  }

  module.exports = {
    requireAuth : requireAuth
  }