const express = require('express');
const routes = require('./app/routes');
const keys = require("./config/keys");

const mongoose = require("mongoose");
mongoose.connect(keys.mongoURI);

const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const store = new MongoDBStore({
  uri: keys.mongoURI,
  collection: 'sessions'
});

const app = express();

const port = process.env.PORT || 5500; 

//session
app.use(session({
  secret: 'pibas2021',
  resave: false,
  saveUninitialized: true,
  store: store
}));

app.use('/', routes);

app.use((err, req, res, next) => {
  res.status(err.status || 400).json({
    success: false,
    message: err.message || 'An error occured.',
    errors: err.error || [],
  });
});

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Resource not found.' });
});

// Start the server
app.listen(port);

console.log(`Server started on port ${port}`);
