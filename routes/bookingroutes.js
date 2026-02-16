const express = require("express");
const { getallShows } = require("../controller/bookingController");
const brouter = express.Router();
const isuser = (req, resp, next) => {
  if (!req.session.userdata || req.session.userdata.role !== "user") {
    return resp.redirect("/login");
  }
  next();
};
brouter.use(isuser);
brouter.get("/shows/:id", getallShows);

module.exports = brouter;
