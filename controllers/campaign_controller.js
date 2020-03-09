const Campaign = require('../models/campaign')
const map = require('lodash/map')
const indexOf = require('lodash/indexOf')

// Check campaign Permissions
const can = function(permission, user, owner) {
  if (!user) return false
  if (indexOf(user.permissions, `${permission}:any`) > -1) return true
  return user.sub === owner
}

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
  try {
    const campaign = await Campaign.findById(req.params.id)
      .populate('empire.grandAdmiral')
      .populate('empire.players')
      .populate('rebels.grandAdmiral')
      .populate('rebels.players')
    if (!campaign) return res.status(404)
    return res.json(campaign)
  } catch(err) {
    return res.status(500).json(err)
  }
}

exports.update = async (req, res, next) => {
  try {
    const campaign = await Campaign.findById(req.params.id)
    if (!campaign) return res.status(404)
    if (!can('update:campaign', req.user, campaign.user)) return res.status(403)
    const updatedCampaign = await Campaign.findByIdAndUpdate(req.params.id, req.body, { new: true })
    return res.json(updatedCampaign)
  } catch (err) {
    return res.status(500).json(err)
  }
}

exports.destroy = async (req, res, next) => {
  try {
    const campaign = await Campaign.findById(req.params.id)
    if (!campaign) return res.status(404)
    if (!can('delete:campaign', req.user, campaign.user)) return res.status(403)
    await Campaign.findByIdAndDelete(req.params.id)
    return res.status(204).json(null)
  } catch(err) {
    console.log(err)
    return res.status(500).json(err)
  }
}
