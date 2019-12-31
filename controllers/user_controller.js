const User = require('../models/user')

exports.index = (req, res, next) => {
  const searchQuery = {
    username: new RegExp(req.query.username, 'i'),
  }
  User.find(searchQuery, (err, users) => {
    if (err) return res.status(500).json(err)
    return res.json(users)
  })
}
