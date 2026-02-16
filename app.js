const express = require("express");
const connectDb = require("./db");
const methodOverride = require("method-override");
const session = require("express-session");
const router = require("./routes/userRoutes");
const AdminRouter = require("./routes/adminRoutes");
const brouter = require("./routes/bookingroutes");
const app = express();

connectDb();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.use(
  session({
    secret: "test",
    resave: false,
    saveUninitialized: false,
  }),
);

app.use("/", router);
app.use("/", AdminRouter);
app.use("/", brouter);

app.listen(4000, () => {
  console.log("running");
});
