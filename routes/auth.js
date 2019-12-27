const passport = require('passport')
const router = require('express').Router()
const AuthController = require('../controllers/auth_controller')

router.post('/register', (req, res, next) => AuthController.register(req, res, next))
router.post('/login', passport.authenticate('local', { session: false }), (req, res, next) => AuthController.login(req, res, next))
router.get('/me', passport.authenticate('jwt', { session: false }), (req, res, next) => AuthController.me(req, res, next))

module.exports = router
