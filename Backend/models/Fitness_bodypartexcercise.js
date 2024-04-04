const mongoose = require("mongoose");

const { Schema } = mongoose;

const Fitness_bodypartexcercise = new Schema({
  // https://www.bodybuilding.com/content/10-best-muscle-building-ab-exercises.html
  body_part_id: { type: String, required: true },
  excercise_id: { type: mongoose.Schema.Types.ObjectId, ref: "fitness_excercise" },
  fitness_level: { type: String, required: true },
  fitness_plan: { type: String, required: true },
  gender: { type: String, required: true },
  reps: { type: String, required: true },
  date: { type: Date, default: Date.now },

});

module.exports = mongoose.model( "fitness_bodypartexcercise", Fitness_bodypartexcercise );

