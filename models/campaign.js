const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId
const User = require('./user')

const PlanetSchema = {
  name: { type: String, required: true },
  regions: [String],
  faction: {
    type: String,
    enum: ['empire', 'empire-base', 'rebel', 'rebel-base', null]
  }
}

const CampaignSchema = new Schema({
  user: { type: ObjectId, ref: 'User', required: true, index: true },
  name: { type: String, required: true },
  players: [{ type: ObjectId, ref: User, index: true }],
  systems: [ PlanetSchema ]
}, { timestamps: true })

module.exports = mongoose.model('Campaign', CampaignSchema)
