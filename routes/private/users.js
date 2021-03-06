const Router = require('express').Router()
const UserController = require('../../controllers/user_controller')

Router.post('/sync', (req, res, next) => UserController.syncProfile(req, res, next))
Router.get('/', (req, res, next) => UserController.find(req, res, next))

module.exports = Router
