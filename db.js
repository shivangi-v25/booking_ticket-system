const mongoose = require("mongoose");
const connectDb = () => {
  mongoose
    .connect("mongodb://localhost:27017/ticket_booking")
    .then((result) => {
      console.log("connected");
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports = connectDb;
