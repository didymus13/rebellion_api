const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId
const get = require('lodash/get')
const FleetSchema = require('./fleet-schema')
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
  name: { type: String },
  grandAdmiral: { type: ObjectId, ref: 'User', required: true, index: true },
  players: [{ type: ObjectId, ref: 'User', required: true, index: true }],
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
  },
  fleets: [{ type: FleetSchema }]
})

const CampaignSchema = new Schema({
  user: { type: String, required: true, index: true },
  name: { type: String, required: true },
  empire: { type: FactionSchema, required: true },
  rebels: { type: FactionSchema, required: true },
  systems: [{ type: PlanetSchema, required: true }],
  act: { type: Number, default: 1 },
  turn: { type: Number, default: 1 },
}, {
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true }
})

CampaignSchema.virtual('playerCount').get(function() {
  return get(this, 'rebels.players', []).length + get(this, 'empire.players', []).length
})

module.exports = mongoose.model('Campaign', CampaignSchema)
