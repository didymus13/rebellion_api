const Fleet = require('../models/fleet')

exports.index = (req, res, next) => {
  Fleet.find({ player: req.user.id }, (err, fleets) => {
    if (err) return res.status(500).json(err)
    return res.json(fleets)
  })
}

exports.store = (req, res, next) => {
  const payload = { ...req.body, player: req.user.id }
  Fleet.create(payload, (err, fleet) => {
    if (err) return res.status(422).json(err)
    return res.status(201).json(fleet)
  })
}

exports.show = (req, res, next) => {
  Fleet.findById(req.params.id, (err, fleet) => {
    if (err) return res.status(500).json(err)
    if (!fleet) return res.status(404).send('Not found')
    return res.json(fleet)
  })
}

exports.update = (req, res, next) => {
  Fleet.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, fleet) => {
    if (err) return res.status(500).json(err)
    if (!fleet) return res.status(404).send('Not found')
    return res.json(fleet)
  })
}

exports.destroy = (req, res, next) => {
  Fleet.findByIdAndDelete(req.params.id, (err, fleet) => {
    if (err) return res.status(500).json(err)
    if (!fleet) return res.status(404).send('Not found')
    return res.status(204).json(null)
  })
}
