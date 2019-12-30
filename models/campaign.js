const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId
const User = require('./user')

const PlanetSchema = new Schema({
  name: { type: String, required: true },
  regions: [String],
  faction: {
    type: String,
    enum: ['empire', 'empire-base', 'rebel', 'rebel-base', null],
    default: null
  },
  baseDefenseObjective: {
    type: String,
    enum: ['Ion cannon', 'Fighter wing', 'Armed station', null],
    default: null
  },
  completedCampaignObjective: { type: String, default: null }
})

const FactionSchema = new Schema({
  side: { type: String, enum: [ 'empire', 'rebels' ]},
  name: { type: String },
  grandAdmiral: { type: ObjectId, ref: User, index: true },
  players: [{ type: ObjectId, ref: User, index: true }],
  points: {
    act: { type: Number, default: 0 },
    total: { type: Number, default: 0 }
  },
  resources: {
    ally: { type: Number, default: 0 },
    destiny: { type: Number, default: 0 },
    diplomats: { type: Number, default: 0 },
    repairYards: { type: Number, default: 0 },
    resources: { type: Number, default: 0 },
    skilledSpacers: { type: Number, default: 0 },
    spynet: { type: Number, default: 0 }
  }
})

const CampaignSchema = new Schema({
  user: { type: ObjectId, ref: 'User', required: true, index: true },
  name: { type: String, required: true },
  factions: [{ type: FactionSchema, required: true }],
  systems: [{ type: PlanetSchema, required: true }],
  act: { type: Number, default: 1 },
  turn: { type: Number, default: 1 }
}, { timestamps: true })

module.exports = mongoose.model('Campaign', CampaignSchema)
