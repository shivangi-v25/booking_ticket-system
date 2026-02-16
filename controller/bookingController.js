const { default: mongoose } = require("mongoose");
const showModel = require("../model/showModel");

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
const removeShow = async (req, resp) => {
  try {
    await showModel.findByIdAndDelete(req.params.id);
    resp.redirect("/shows");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getallShows, removeShow };
