const mongoose = require("mongoose");

const { Schema } = mongoose;

const Fitness_bodypartSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  name: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("fitness_bodypart", Fitness_bodypartSchema);
