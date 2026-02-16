const express = require("express");
const { register, login, dashboard } = require("../controller/userController");
const router = express.Router();

router.get("/register", (req, resp) => {
  resp.render("register");
});
router.post("/register", register);

router.get("/login", (req, resp) => {
  resp.render("login");
});

router.post("/login", login);

const isuser = (req, resp, next) => {
  if (!req.session.userdata || req.session.userdata.role !== "user") {
    console.log("im here in user pasth");

    return resp.redirect("/login");
  }
  next();
};
router.get("/home", isuser, dashboard);
router.get("/logout", (req, resp) => {
  req.session.destroy((err) => {
    console.log("entered");

    if (err) {
      console.log(err);
    }
    resp.redirect("/login");
  });
});

module.exports = router;
