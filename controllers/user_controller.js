const User = require('../models/user')

exports.syncProfile = async (req, res, next) => {
  try {
    const user = await User.findOneAndUpdate({ sub: req.user.sub }, req.body, { upsert: true, new: true })
    return res.status(200).json(user)
  } catch (err) {
    return res.status(500).json(err)
  }
}
