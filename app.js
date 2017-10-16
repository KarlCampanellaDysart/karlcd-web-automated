// load environment
require('dotenv').config();

// import necessary things
var express = require('express');
var app = express();
var bodyParser = require('body-parser')

// setup app
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());       
app.use(bodyParser.urlencoded({ extended: true })); 

// setup api routes
require('./app/routes/githubRoutes')(app);
require('./app/routes/mlabRoutes')(app);
require('./app/routes/gsheetRoutes')(app);
require('./app/routes/loginRoutes')(app);

module.exports = app;
