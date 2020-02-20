const Router = require('express').Router()

Router.use('/campaigns', require('./campaigns'))

module.exports = Router
