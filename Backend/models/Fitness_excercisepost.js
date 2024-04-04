const mongoose = require("mongoose");

const { Schema } = mongoose;

const Fitness_excercisepost = new Schema({

  gender: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  body_part_id: { type: String },
  excercise_id: { type: String },
  date: { type: Date, default: Date.now },

});

module.exports = mongoose.model("fitness_excercisepost", Fitness_excercisepost);
