var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  return res.json({ name: 'Rebellion API', version: '1.0' })
});

module.exports = router;
