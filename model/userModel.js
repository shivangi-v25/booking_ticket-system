const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: { type: String, lowercase: true, required: true },
  email: {
    type: String,
    match: /^\S+@\S+\.\S+$/,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("user", UserSchema);
