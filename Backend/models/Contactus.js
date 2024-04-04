const mongoose = require("mongoose");

const { Schema } = mongoose;

const Contactus = new Schema({

  name: { type: String, required: true },
  email: { type: String, required: true },
  number: { type: Number, required: true },
  goal: { type: String, required: true },
  comment: { type: String, required: true },
  date: { type: Date, default: Date.now },
  
});

module.exports = mongoose.model("contactus", Contactus);
