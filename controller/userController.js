const userModel = require("../model/userModel");
const movieModel = require("../model/movieModel");

const bcrypt = require("bcryptjs");

const register = async (req, resp) => {
  try {
    const { name, email, password } = req.body;
    const haspass = await bcrypt.hash(password, 10);
    await userModel.create({ name, email, password: haspass });
    resp.redirect("/login");
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, resp) => {
  try {
    const { email, password } = req.body;

    // Admin login
    if (email === "admin@gmail.com") {
      if (password === "admin") {
        req.session.userdata = {
          name: "admin",
          role: "admin",
        };
        console.log(req.session, "come to page");

        return resp.redirect("/admin/admindash");
      } else {
        return resp.end("Invalid credentials");
      }
    }

    // Regular user login
    const user = await userModel.findOne({ email });
    if (!user) {
      console.log("userr");

      return resp.end("No user exists");
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return resp.end("Invalid credentials");
    }
    console.log(" matched");
    console.log(user);

    req.session.userdata = { id: user.id, role: "user" };

    return resp.redirect("/home");
  } catch (error) {
    console.log(error);
    return resp.status(500).send("Server error");
  }
};

const dashboard = async (req, resp) => {
  try {
    const movies = await movieModel.find();
    resp.render("home", { movies });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { register, login, dashboard };
