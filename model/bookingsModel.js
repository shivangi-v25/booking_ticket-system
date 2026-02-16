const mongoose = require("mongoose");
const movieModel = require("./movieModel");
const userModel = require("./userModel");
const bookSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userModel",
    required: true,
  },
  show: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "movieModel",
    required: true,
  },
  Seats: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("booking", bookSchema);
