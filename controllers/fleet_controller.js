const Campaign = require('../models/campaign')
const User = require('../models/user')
const can = require('../middleware/can')

exports.store = async (req, res, next) => {
  try {
    const user = await User.findOne({ sub: req.user.sub })
    if (!user) return res.status(404).json('Not found')

    const campaign = await Campaign.findOne({
      _id: req.params.id,
      [`${req.params.faction}.players`]: user._id
    })
    if (!campaign) return res.status(404).json('Not found')

    campaign[req.params.faction].fleets.push({ ...req.body, player: user._id })
    await campaign.save()
    return res.json(campaign)
  } catch (err) {
    return res.status(500).json(err)
  }
}

exports.update = async (req, res, next) => {
  try {
    const campaign = await Campaign.findOne({
      _id: req.params.id,
      [`${req.params.faction}.fleets._id`]: req.params.fleetId
    })
    if (!campaign) return res.status(404).json('Not found')
    const fleet = campaign[req.params.faction].fleets.id(req.params.fleetId)

    if (!can('update:fleet', req.user, fleet.player)) return res.status(403).json('Forbidden')
    fleet.update(req.body)
    await campaign.save()
    return res.json(fleet)
  } catch (err) {
    return res.status(500).json(err)
  }
}

exports.destroy = async (req, res, next) => {
  //
}
