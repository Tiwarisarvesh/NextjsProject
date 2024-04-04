const mongoose = require("mongoose");

const { Schema } = mongoose;

const Fitness_excercise = new Schema({

  name: { type: String, required: true },
  equipment_id: { type:String , required: true},
  image: { type: String, required: true },
  date: { type: Date, default: Date.now },

});

module.exports = mongoose.model("fitness_excercise", Fitness_excercise);
