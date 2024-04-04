const mongoose = require("mongoose");

const { Schema } = mongoose;

const Fitness_food = new Schema({

  name: { type: String, required: true },
  calories: { type: String, required: true },
  date: { type: Date, default: Date.now },
  
});

module.exports = mongoose.model("fitness_food", Fitness_food);
