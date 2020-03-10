const Campaign = require('../models/campaign')
const User = require('../models/user')
const can = require('../middleware/can')
const indexOf = require('lodash/indexOf')
exports.store = async (req, res, next) => {
  try {
    const user = await User.findOne({ sub: req.user.sub })
    if (!user) return res.status(404).json('Not found')

    const campaign = await Campaign.findOneAndUpdate(
      {
        _id: req.params.id,
        [`${req.params.faction}.players`]: user._id
      },
      { $push: { [`${req.params.faction}.fleets`]: { ...req.body, player: user._id } } }
    )
    if (!campaign) return res.status(404).json('Not found')
    return res.json(campaign)
  } catch (err) {
    return res.status(500).json(err)
  }
}

exports.update = async (req, res, next) => {
  try {
    const user = await User.findOne({ sub: req.user.sub })
    if (!user) return res.status(404).json('Not found')

    const campaign = await Campaign.findOne({
      _id: req.params.id,
      [`${req.params.faction}.fleets._id`]: req.params.fleetId,
      [`${req.params.faction}.fleets.player`]: user._id
    })
    if (!campaign) return res.status(404).json('Not found')
    const fleets = campaign[req.params.faction].fleets
    const fleet = fleets.id(req.params.fleetId)
    fleet.set(req.body)
    await campaign.save()
    return res.json(campaign)
  } catch (err) {
    return res.status(500).json(err)
  }
}

exports.destroy = async (req, res, next) => {
  try {
    const user = await User.findOne({ sub: req.user.sub })
    if (!user) return res.status(404).json('Not found')

    const campaign = await Campaign.updateOne(
      {
        _id: req.params.id,
        [`${req.params.faction}.fleets._id`]: req.params.fleetId,
        [`${req.params.faction}.fleets.player`]: user._id
      },
      { $pull: {
        [`${req.params.faction}.fleets`]: { _id: req.params.fleetId } }
      },
      { new: true }
    )
    if (!campaign) return res.status(404).json('Not found')
    return res.json(campaign)
  } catch (err) {
    return res.status(500).json(err)
  }
}
