const jwt = require('jsonwebtoken')
const User = require('../models/user')

exports.register = (req, res, next) => {
  User.register(req.body, req.body.password, function(err, user) {
    if (err) return res.json(err)
    const token = jwt.sign({ sub: user.id }, process.env.APP_KEY)
    return res.json({ token })
  })
}

exports.login = (req, res, next) => {
  const token = jwt.sign({ sub: req.user.id }, process.env.APP_KEY)
  return res.json({ token })
}

exports.me = (req, res, next) => {
  return res.json({ user: req.user })
}
