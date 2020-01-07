const router = require('express').Router();
const statsController = require('./../controllers/statsController')
db = require('./../models')

router.route("/stats")
  .get(statsController.getStats)
  .post(statsController.addStats)

module.exports = router;