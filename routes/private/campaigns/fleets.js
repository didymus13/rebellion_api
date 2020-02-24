const Router = require('express').Router()
const FleetController = require('../../../controllers/fleet_controller')

Router.route('/:fleetId')
  .get((req, res, next) => FleetController.show(req, res, next))
  .put((req, res, next) => FleetController.update(req, res, next))
  .delete((req, res, next) => FleetController.destroy(req, res, next))

module.exports = Router
