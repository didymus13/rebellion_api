const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId
const User = require('./user')
const Campaign = require('./campaign')
const sumBy = require('lodash/sumBy')

const BattleSchema = new Schema({
  location: { type: String, required: true },
  objective: { type: String, required: true },
  winLoss: { type: String, enum: ['W', 'L'], required: true },
  xp: { type: Number, required: true, min: 0},
  reward: { type: String, required: true },
})

const AbilitySchema = new Schema({
  name: { type: String, required: true },
  tier: { type: String, enum: ['I', 'II', 'III', 'IV'], required: true },
  cost: { type: Number, min: 0, max: 4, required: true },
  category: { type: String, enum: ['engineering', 'espionnage', 'gunnery', 'logistics', 'navigation', 'squadron tactics']},
  rules: { type: String }
})

const ShipSchema = new Schema({
  isFlagship: { type: Boolean, default: false },
  name: { type: String, required: true },
  upgrades: { type: String },
  points: { type: Number, required: true },
  isVeteran: { type: Boolean, default: false },
  isScarred: { type: Boolean, default: false }
})

const SquadronSchema = new Schema({
  name: { type: String, required: true },
  points: { type: Number, required: true },
  isVeteran: { type: Boolean, default: false },
  isScarred: { type: Boolean, default: false }
})

const FleetSchema = new Schema({
  player: { type: ObjectId, ref: 'User', required: true, index: true },
  campaign: { type: ObjectId, ref: 'Campaign', required: true, index: true },
  name: { type: String, required: true },
  faction: { type: String, enum: ['empire', 'rebel'], required: true },
  condition: { type: String, default: null },
  objectives: {
    assault: { type: String, required: true },
    defense: { type: String, required: true },
    navigation: { type: String, required: true }
  },
  battles: [BattleSchema],
  commander: {
    name: { type: String, required: true },
    xp: {
      total: { type: Number, default: 0 },
      spent: { type: Number, default: 0 }
    },
    abilities: [ { type: AbilitySchema, required: true }]
  },
  strategicEffectTokens: {
    ally: { type: Number, default: 0 },
    destiny: { type: Number, default: 0 },
    spynet: { type: Number, default: 0 }
  },
  ships: [{ type: ShipSchema, required: true }],
  squadrons: [SquadronSchema]
}, { toJSON: { virtuals: true } })

FleetSchema.virtual('shipTotal').get(function() {
  return sumBy(this.ships, 'points') || 0
})

FleetSchema.virtual('squadronTotal').get(function() {
  return sumBy(this.squadrons, 'points') || 0
})

FleetSchema.virtual('total').get(function() {
  return this.shipTotal + this.squadronTotal
})

module.exports = mongoose.model('Fleet', FleetSchema)
