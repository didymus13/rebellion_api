const Campaign = require('../models/campaign')
const client = require('../config/contentful').default
const map = require('lodash/map')

exports.index = async (req, res, next) => {
  const query = { $or: [
    { user: req.user.sub },
    { factions: { $elemMatch: { grandAdmiral: req.user.id } } },
    { factions: { $elemMatch: { players: { $in: [req.user.id] } } } }
  ] }
  const campaigns = await Campaign.find(query).sort('-createdAt')
  return res.json(campaigns)
}

exports.store = async (req, res, next) => {
  const systems = require('../config/seed/StarSystems.json')
  try {
    const campaignData = {...req.body, systems, user: req.user.sub }
    const campaign = await Campaign.create(campaignData)
    return res.status(201).json(campaign)
  } catch (err) {
    return res.status(500).json(err)
  }
}

exports.show = async (req, res, next) => {
  const campaign = await Campaign.findById(req.params.id)
    .populate('empire.grandAdmiral')
    .populate('empire.players')
    .populate('rebels.grandAdmiral')
    .populate('rebels.players')
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
