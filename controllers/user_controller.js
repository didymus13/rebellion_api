const User = require('../models/user')

exports.syncProfile = async (req, res, next) => {
  try {
    const user = await User.findOneAndUpdate({ sub: req.user.sub }, req.body, { upsert: true, new: true })
    return res.status(200).json(user)
  } catch (err) {
    return res.status(500).json(err)
  }
}

exports.find = async (req, res, next) => {
  const pageSize = parseInt(req.query.pageSize) || 12
  const page = parseInt(req.query.page) || 1
  const skip = pageSize * (page - 1)
  try {
    const users = await User.find({
      name: { '$regex': req.query.email, '$options': 'i' }
    }).skip(skip).limit(pageSize)
    return res.status(200).json(users)
  } catch (err) {
    return res.status(500).json(err)
  }
}
