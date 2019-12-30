const Campaign = require('../models/campaign')
const Fleet = require('../models/fleet')
const client = require('../config/contentful').default
const map = require('lodash/map')

exports.index = async (req, res, next) => {
  const query = { $or: [
    { user: req.user.id },
    { factions: { $elemMatch: { grandAdmiral: req.user.id } } },
    { factions: { $elemMatch: { players: { $in: [req.user.id] } } } }
  ] }
  const campaigns = await Campaign.find(query).sort('-createdAt')
  return res.json(campaigns)
}

exports.store = async (req, res, next) => {
  const { items } = await client.getEntries({
    content_type: 'rebellionSystem',
    order: 'sys.createdAt'
  })
    .catch((err) => res.status(500).json(err))

  const systems = map(items, (item) => ({
    name: item.fields.name,
    regions: item.fields.regions
  }))

  const campaignData = {...req.body, user: req.user.id, systems: systems }

  const campaign = await Campaign.create(campaignData)
    .catch((err) => res.status(422).json(err))
  return res.status(201).json(campaign)
}

exports.show = async (req, res, next) => {
  const campaign = await Campaign.findById(req.params.id)
    .populate('user')
    .populate('factions.grandAdmiral')
    .populate('factions.players')
  return res.json(campaign)
}

exports.update = async (req, res, next) => {
  const campaign = await Campaign.findByIdAndUpdate(req.params.id, req.body, { new: true })
  return res.json(campaign)
}

exports.destroy = async (req, res, next) => {
  await Campaign.findByIdAndDelete(req.params.id)
  return res.status(204).json(null)
}

exports.storeFleet = (req, res, next) => {
  const payload = { ...req.body, player: req.user.id, campaign: req.params.id }
  Fleet.create(payload, (err, fleet) => {
    if (err) return res.status(422).json(err)
    return res.status(201).json(fleet)
  })
}

exports.showFleets = (req, res, next) => {
  Fleet.find({ campaign: req.params.id }, (err, fleets) => {
    if (err) return res.status(500).json(err)
    return res.json(fleets)
  })
}
