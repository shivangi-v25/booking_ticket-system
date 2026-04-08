const { default: mongoose } = require("mongoose");
const showModel = require("../model/showModel");
const bookingsModel = require("../model/bookingsModel");
const movieModel = require("../model/movieModel");

const getallShows = async (req, resp) => {
  try {
    console.log("started");

    const id = req.params.id;
    console.log(req.session.userdata.role);

    const objectId = new mongoose.Types.ObjectId(id);
    const shows = await showModel.find({ movie: objectId }).populate("movie");
    console.log(shows);

    resp.render("shows", { shows });
  } catch (error) {
    console.log(error);
  }
};

const bookShow = async (req, resp) => {
  try {
    const { Seats, price } = req.body;
    console.log(req.body);

    const user = req.session.userdata.id;
    console.log(user);

    const show = req.params.id;
    console.log(show);

    await bookingsModel.create({ user, show, Seats, price });
    await showModel.updateOne(
      { _id: show },
      { $inc: { availableSeats: -Number(Seats) } },
    );
    resp.redirect("/movies/booking");
  } catch (error) {
    console.log(error);
  }
};

const removeShow = async (req, resp) => {
  try {
    const cancelBooking = await bookingsModel.findById(req.params.id);
    const bookedSeats = cancelBooking.Seats;
    const showId = cancelBooking.show;
    await bookingsModel.findByIdAndDelete(req.params.id);
    await showModel.updateOne(
      { _id: showId },
      { $inc: { availableSeats: Number(bookedSeats) } },
    );
    resp.redirect("/movies/booking");
  } catch (error) {
    console.log(error);
  }
};
const getbooking = async (req, resp) => {
  try {
    console.log("trying to catch");

    const show = await showModel.findById(req.params.id).populate("movie");
    console.log(show);
    resp.render("bookShow", { show });
  } catch (error) {
    console.log(error);
  }
};
const showBooked = async (req, resp) => {
  try {
    const id = req.session.userdata.id;
    console.log(id, "booking history started");
    const book = await bookingsModel.find({ user: id }).populate({
      path: "show",
      populate: {
        path: "movie",
      },
    });

    // const movie = await movieModel.findById(movieId);

    // console.log("found it ", { book, movie });

    resp.render("booking", { book });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getallShows, removeShow, bookShow, getbooking, showBooked };
