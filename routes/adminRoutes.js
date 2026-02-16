const express = require("express");
const {
  admindash,
  movieAdd,
  editMovie,
  deleteMovie,
  fetchMoviebyId,
  getShow,
  AddShow,
  allShow,
  fetchshowbyId,
  editShow,
  deleteshow,
} = require("../controller/adminController");
const AdminRouter = express.Router();

const isAdmin = (req, resp, next) => {
  if (!req.session.userdata || req.session.userdata.role !== "admin") {
    return resp.redirect("/login");
  }
  next();
};
AdminRouter.use(isAdmin);

AdminRouter.get("/admindash", admindash);
AdminRouter.get("/movieAdd", (req, resp) => {
  resp.render("admin/movieAdd");
});
AdminRouter.post("/movieAdd", movieAdd);

AdminRouter.get("/editMovie/:id", fetchMoviebyId);

AdminRouter.patch("/editMovie/:id", editMovie);
AdminRouter.delete("/deleteMovie/:id", deleteMovie);

AdminRouter.get("/addShow", getShow);
AdminRouter.post("/addShow", AddShow);

AdminRouter.get("/allShow", allShow);
AdminRouter.get("/editShow/:id", fetchshowbyId);
AdminRouter.patch("/editShow/:id", editShow);

AdminRouter.delete("/deleteShow/:id", deleteshow);
AdminRouter.get("/logout", (req, resp) => {
  req.session.destroy((err) => {
    console.log("entered");

    if (err) {
      console.log(err);
    }
    resp.redirect("/login");
  });
});
module.exports = AdminRouter;
