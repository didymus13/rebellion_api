const router = require('express').Router()
const passport = require('passport')
const UserController = require('../controllers/user_controller')

router.use(passport.authenticate('jwt', { session: false }))

router.route('/')
  .get((req, res, next) => UserController.index(req, res, next))

module.exports = router
