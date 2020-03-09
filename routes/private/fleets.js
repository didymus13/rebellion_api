const Router = require('express').Router({ mergeParams: true })
const FleetController = require('../../controllers/fleet_controller')

Router.route('/')
  .post((req, res, next) => FleetController.store(req, res, next))

Router.route('/:fleetId')
  .put((req, res, next) => FleetController.update(req, res, next))
  .delete((req, res, next) => FleetController.destroy(req, res, next))

module.exports = Router
