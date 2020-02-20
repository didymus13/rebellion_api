require('dotenv').config()

var express = require('express');
var path = require('path');
var logger = require('morgan');
const bodyParser = require('body-parser')
const cors = require('cors')

require('./config/database.js')

var app = express();

app.use(logger('dev'));
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
require('./routes')(app)

module.exports = app;
