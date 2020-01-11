const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const statsSchema = new Schema({
  miles: { type: Number, required: true },
  calories: { type: Number, required: true },
  time: { type: Number, required: true },
  date: { type: String, required: true }
})

const Stats = mongoose.model("Saved", statsSchema );

module.exports = Stats;