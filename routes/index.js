const checkJwt = require('../middleware/checkJwt')

module.exports = function(app) {
  app.use('/public', require('./public'))
  app.use('/private', checkJwt, require('./private'))
  app.get('/', (req, res) => res.json({ name: 'Rebellion API', version: '1.0' }))
}
