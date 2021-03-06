const db = require('./../models')

module.exports = {
  getStats: function (req, res) {
    db.Stats
      .find()
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },
  addStats: function (req, res) {
    db.Stats
      .create(req.body)
      .then(function (dbSaved) {
      })
      .catch(function (err) {
        console.log(err)
      })
  },
  deleteStat: function (req, res) {
    db.Stats
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.delete())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  }

}