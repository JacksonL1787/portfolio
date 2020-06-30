var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')
var bodyParser = require('body-parser')

var indexRoute = require('./routes/index');

const port = process.env.PORT || 3000
var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', 'bin')));

app.use('/', indexRoute);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.redirect("/")
});

const server = app.listen(port, () => console.log('Server started listening on port '+ port + "!"));

module.exports = app;
