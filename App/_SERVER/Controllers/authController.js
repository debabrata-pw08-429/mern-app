require("dotenv").config();
const userModel = require("../Models/usersModel");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

async function register({ name, email, profilePicture, password }) {
  if (!password) {
    password = process.env.RANDOM_PASSWORD;
  }

  let useremail = email;
  let userexists = userModel.exists({ email: useremail });

  if (userexists) {
    return "User Alredy Exists !";
  }

  let userObj = {
    name,
    email,
    profilePicture,
    password: bcrypt.hashSync(password, saltRounds),
  };

  let x = await userModel.create({ ...userObj });
  x.save();
  return x;
}

async function login({ email, password }) {
  let user = await userModel.findOne({ email });

  if (user) {
    let passOk = bcrypt.compare(password, user.password);

    if (passOk) {
      user = user.toJSON();

      if (user.password) {
        delete user.password;
      }

      let token = jwt.sign(user, process.env.JWT_SECRET);

      console.log("server token => ",token);
      return token;
    } else {
      return "";
    }
  }
}

module.exports = { register, login };
