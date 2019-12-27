const passport = require('passport')
const User = require('../models/user')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

// Local Strategy
passport.use(User.createStrategy())

// JWT Token Extractor
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.APP_KEY
}

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
  User.findById(jwt_payload.sub, function(err, user) {
    if (err) return done(err, false)
    if(!user) return done(null, false)
    return done(null, user)
  })
}))
