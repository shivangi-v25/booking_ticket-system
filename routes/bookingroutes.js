const express = require("express");
const {
  getallShows,
  bookShow,
  getbooking,
  showBooked,
  removeShow,
} = require("../controller/bookingController");
const brouter = express.Router();

const isuser = (req, resp, next) => {
  if (!req.session.userdata || req.session.userdata.role !== "user") {
    return resp.redirect("/login");
  }
  next();
};
brouter.use(isuser);
brouter.get("/shows/:id", getallShows);

brouter.get("/bookShow/:id", getbooking);
brouter.post("/bookShow/:id", bookShow);
brouter.delete("/removeShow/:id", removeShow);
brouter.get("/booking", showBooked);
module.exports = brouter;
