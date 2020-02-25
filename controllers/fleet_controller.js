const Campaign = require('../models/campaign')
const last = require('lodash/last')
const assign = require('lodash/assign')

exports.show = async (req, res, next) => {
  return res.json(req.params)
  // try {
  //   const campaign = await Campaign.findById(req.params.id)
  //   const fleet = campaign.empire.fleets.id(req.params.fleetId) ||
  //     campaign.rebels.fleets.id(req.params.fleetId)
  //   return res.status(200).json(fleet)
  // } catch (err) {
  //   return res.status(500).json(err)
  // }
}

exports.store = async (req, res, next) => {
  try {
    const fleetPath = `${req.params.faction}.fleets`
    const fleetBody = assign({ player: req.user.sub, ...req.body})
    const campaign = await Campaign.findByIdAndUpdate(
      req.params.id,
      { $push: { [fleetPath]: fleetBody } },
      { new: true }
    )
    if (!campaign) return res.status(404)
    return res.json(campaign)
  } catch (err) {
    return res.status(500).json(err)
  }
}
