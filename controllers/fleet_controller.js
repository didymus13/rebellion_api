const find = require('lodash/find')
const last = require('lodash/last')
const assign = require('lodash/assign')
const Campaign = require('../models/campaign')

exports.show = async (req, res, next) => {
  try {
    const campaign = await Campaign.findById(req.params.id)
    if (!campaign) return res.status(404)
    const fleet = find(campaign.fleets, { _id: req.params.fleetId })
    if (!fleet) return res.status(404)
    return res.json(fleet)
  } catch (err) {
    return res.status(500).json(err)
  }
}

exports.store = async (req, res, next) => {
  try {
    const campaign = await Campaign.findById(req.params.id)
    if (!campaign) return res.status(404)
    campaign.fleets.push(req.body)
    const updated = await Campaign.findByIdAndUpdate(req.params.id, { ...campaign }, { new: true })
    return res.status(201).json(last(updated.fleets))
  } catch (err) {
    return res.status(500).json(err)
  }
}

exports.update = async (req, res, next) => {
  try {
    const campaign = await Campaign.findById(req.params.id)
    if (!campaign) return res.status(404)
    const updated = await campaign.findOneAndUpdate(
      { _id: req.params.id, "fleets._id": req.params.fleetId },
      { $set: { "fleets.$": req.body } },
      { new: true }
    )
    return res.status(200).json(updated)
  } catch (err) {
    return res.status(500).json(err)
  }
}

exports.destroy = async (req, res, next) => {
  try {
    const campaign = await Campaign.findById(req.params.id)
    if (!campaign) return res.status(404)
    await campaign.findOneAndDelete({
      _id: req.params.id,
      "fleets._id": req.params.fleetId
    })
    return res.status(204)
  } catch (err) {
    return res.status(500).json(err)
  }
}
