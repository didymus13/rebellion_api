const express = require('express')
const router = express.Router()
const passport = require('passport')

/* GET home page. */
router.get('/', function(req, res, next) {
  return res.json({ name: 'Rebellion API', version: '1.0' })
});

module.exports = router;
