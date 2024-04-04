const mongoose = require("mongoose");

const { Schema } = mongoose;

const Fitness_foodpost = new Schema({

  gender: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String },
  foodID: { type: mongoose.Schema.Types.ObjectId, ref: "fitness_food" },
  date: { type: Date, default: Date.now },

});

module.exports = mongoose.model("fitness_foodpost", Fitness_foodpost);
