const mongoose = require("mongoose");

const { Schema } = mongoose;

const Fitness_goal = new Schema({

  name: { type: String, required: true },
  fitnessPlan: { type: String, required: true },
  gender: { type: String, required: true },
  date: { type: Date, default: Date.now },

});

module.exports = mongoose.model("fitness_goal", Fitness_goal);
