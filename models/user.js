const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = {
  sub: { type: String, required: true, index: true, unique: true },
  nickname: { type: String },
  name: { type: String },
  email: { type: String, index: true, unique: true },
  picture: { type: String }
}
module.exports = mongoose.model('User', UserSchema)
