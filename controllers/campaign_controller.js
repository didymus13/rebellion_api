const Campaign = require('../models/campaign')
const client = require('../config/contentful').default
const map = require('lodash/map')

exports.index = async (req, res, next) => {
  const query = { $or: [
    { user: req.user.id },
    { players: { $in: [req.user.id] } }
  ] }
  const campaigns = await Campaign.find(query).sort('-createdAt')
  return res.json(campaigns)
}

exports.store = async (req, res, next) => {
  const { items } = await client.getEntries({content_type: 'rebellionSystem'})
  const systems = map(items, (item) => ({
    name: item.fields.name,
    regions: item.fields.regions
  }))

  const campaignData = {...req.body, user: req.user.id, systems: systems }

  Campaign.create(campaignData, (err, campaign) => {
    if (err) return res.status(422).json(err)
    return res.json(campaign)
  })
}

exports.show = async (req, res, next) => {
  const campaign = await Campaign.findById(req.params.id)
    .populate('user')
    .populate('players')
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
