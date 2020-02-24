const router = require('express').Router()
const CampaignController = require('../../../controllers/campaign_controller')

router.route('/')
  .get((req, res, next) => CampaignController.index(req, res, next))
  .post((req, res, next) => CampaignController.store(req, res, next))

router.route('/:id')
  .get((req, res, next) => CampaignController.show(req, res, next))
  .put((req, res, next) => CampaignController.update(req, res, next))
  .delete((req, res, next) => CampaignController.destroy(req, res, next))


router.use('/:id/fleets', require('./fleets'))

module.exports = router
