require('dotenv').config()

var express = require('express');
const passport = require('passport')
var path = require('path');
// var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser')

var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');

require('./config/database.js')
require('./config/passport.js')

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize())

// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/auth', authRouter);

module.exports = app;
