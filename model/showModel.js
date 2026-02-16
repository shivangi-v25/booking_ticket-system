const mongoose = require("mongoose");
const movieModel = require("./movieModel");

const ShowSchema = mongoose.Schema({
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  availableSeats: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("show", ShowSchema);
