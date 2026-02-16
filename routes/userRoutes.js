const express = require("express");
const { register, login, dashboard } = require("../controller/userController");
const router = express.Router();

const isuser = (req, resp, next) => {
  if (!req.session.userdata || req.session.userdata.role !== "user") {
    return resp.redirect("/login");
  }
  next();
};
router.get("/register", (req, resp) => {
  resp.render("register");
});
router.post("/register", register);

router.get("/login", (req, resp) => {
  resp.render("login");
});

router.post("/login", login);
router.use(isuser);

router.get("/home", dashboard);
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
