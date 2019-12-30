const router = require('express').Router()
const passport = require('passport')
const CampaignController = require('../controllers/campaign_controller')

router.use(passport.authenticate('jwt', { session: false }))

router.route('/')
  .get((req, res, next) => CampaignController.index(req, res, next))
  .post((req, res, next) => CampaignController.store(req, res, next))

router.route('/:id')
  .get((req, res, next) => CampaignController.show(req, res, next))
  .put((req, res, next) => CampaignController.update(req, res, next))
  .delete((req, res, next) => CampaignController.destroy(req, res, next))

router.route('/:id/fleets')
  .get((req, res, next) => CampaignController.showFleets(req, res, next))
  .post((req, res, next) => CampaignController.storeFleet(req, res, next))

module.exports = router
