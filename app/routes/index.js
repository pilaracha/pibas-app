const routes = require('express').Router();
const bodyParser = require('body-parser');

//Aca dsp veo como lo dejo mejor
require('../models/User');
require('../models/Graphic');
require('../models/Dashboard');

// Require routes
const auth = require('./auth');
const dehia = require('./dehia');
const pibas = require('./pibas');

// configure app to use bodyParser()
// this will let us get the data from a POST
routes.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
routes.use(bodyParser.json({ limit: '50mb' }));

routes.use((req, res, next) => {
  // do logging
  console.log(`Resource requested: ${req.method} ${req.originalUrl}`);
  next(); // make sure we go to the next routes and don't stop here
});

routes.use('/auth', auth);
routes.use('/dehia', dehia);
routes.use('/pibas', pibas);
routes.get('/', (req, res) => {
  res.status(200).json({ success: true, message: 'Hello world!' });
});

module.exports = routes;