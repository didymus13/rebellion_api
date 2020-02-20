const Router = require('express').Router()

Router.use('/campaigns', require('./campaigns'))
Router.use('/users', require('./users'))

module.exports = Router
