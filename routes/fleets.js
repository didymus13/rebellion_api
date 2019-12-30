const router = require('express').Router()
const passport = require('passport')
const FleetController = require('../controllers/fleet_controller')

router.use(passport.authenticate('jwt', { session: false }))

router.route('/')
  .get((req, res, next) => FleetController.index(req, res, next))
  .post((req, res, next) => FleetController.store(req, res, next))

router.route('/:id')
  .get((req, res, next) => FleetController.show(req, res, next))
  .put((req, res, next) => FleetController.update(req, res, next))
  .delete((req, res, next) => FleetController.destroy(req, res, next))

module.exports = router
