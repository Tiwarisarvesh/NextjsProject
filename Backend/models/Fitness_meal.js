const mongoose = require("mongoose");

const { Schema } = mongoose;

const Fitness_meal = new Schema({

  name: { type: String, required: true },
  date: { type: Date, default: Date.now },

});

module.exports = mongoose.model("fitness_meal", Fitness_meal);
