const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
  poster: { type: String, required: true },
  title: { type: String, required: true },
  description: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
});

const movieModel = mongoose.model("Movie", movieSchema);
module.exports = movieModel;
