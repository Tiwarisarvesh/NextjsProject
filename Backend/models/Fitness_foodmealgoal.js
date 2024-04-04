const mongoose = require("mongoose");

const { Schema } = mongoose;

const Fitness_foodmealgoal = new Schema({

  food_id: { type: mongoose.Schema.Types.ObjectId, ref: "fitness_food" },
  goal_id: { type: mongoose.Schema.Types.ObjectId, ref: "fitness_goal" },
  meal_id: { type: mongoose.Schema.Types.ObjectId, ref: "fitness_meal" },
  date: { type: Date, default: Date.now },

});

module.exports = mongoose.model("fitness_foodmealgoal", Fitness_foodmealgoal );
