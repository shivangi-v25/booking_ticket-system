const movieModel = require("../model/movieModel");
const showModel = require("../model/showModel");
const { logout } = require("./userController");

const admindash = async (req, resp) => {
  try {
    console.log("session:", req.session);

    const movies = await movieModel.find();
    resp.render("admin/admindash", { movies });
  } catch (error) {
    console.log(error);
  }
};
const movieAdd = async (req, resp) => {
  try {
    const { title, description, duration, genre, poster } = req.body;
    await movieModel.create({ title, description, duration, genre, poster });
    resp.redirect("/admin/admindash");
  } catch (error) {
    console.log(error);
  }
};
const editMovie = async (req, resp) => {
  try {
    await movieModel.findByIdAndUpdate(req.params.id, req.body);
    resp.redirect("/admin/admindash");
  } catch (error) {
    console.log(error);
  }
};

const fetchMoviebyId = async (req, resp) => {
  try {
    const movie = await movieModel.findById(req.params.id);
    resp.render("admin/editMovie", { movie });
  } catch (error) {
    console.log(error);
  }
};

const deleteMovie = async (req, resp) => {
  try {
    await movieModel.findByIdAndDelete(req.params.id);
    resp.redirect("/admin/admindash");
  } catch (error) {
    console.log(error);
  }
};

const getShow = async (req, resp) => {
  try {
    const Movie = await movieModel.find();
    resp.render("admin/addShow", { Movie });
  } catch (error) {
    console.log(error);
  }
};

const AddShow = async (req, resp) => {
  try {
    const { movie, date, time, availableSeats, price } = req.body;

    await showModel.create({ movie, date, time, availableSeats, price });
    resp.redirect("/admin/admindash");
  } catch (error) {
    console.log(error);
  }
};

const allShow = async (req, resp) => {
  try {
    const shows = await showModel.find().populate("movie");
    resp.render("admin/allShow", { shows });
  } catch (error) {
    console.log(error);
  }
};

const fetchshowbyId = async (req, resp) => {
  try {
    const shows = await showModel.findById(req.params.id).populate("movie");
    const Movie = await movieModel.find();
    resp.render("admin/editShow", { shows, Movie });
  } catch (error) {
    console.log(error);
  }
};

const editShow = async (req, resp) => {
  try {
    console.log(req.body);

    await showModel.findByIdAndUpdate(req.params.id, req.body);
    resp.redirect("/admin/allshow");
  } catch (error) {
    console.log(error);
  }
};

const deleteshow = async (req, resp) => {
  try {
    await showModel.findByIdAndDelete(req.params.id);
    resp.redirect("/admin/allShow");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
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
};
