require('dotenv').config()

var express = require('express');
const passport = require('passport')
var path = require('path');
// var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser')
const cors = require('cors')

require('./config/database.js')
require('./config/passport.js')

const indexRouter = require('./routes/index')
const authRouter = require('./routes/auth')
const campaignRouter = require('./routes/campaigns')
const fleetRouter = require('./routes/fleets')
const userRouter = require('./routes/users')

var app = express();

app.use(logger('dev'));
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize())

// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/campaigns', campaignRouter)
app.use('/fleets', fleetRouter)
app.use('/users', userRouter)

module.exports = app;
