require("dotenv").config();
const userModel = require("../Models/users.model");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

async function register({ name, email, password }) {
  let x = await userModel.create({
    name,
    email,
    password: bcrypt.hashSync(password, saltRounds),
  });

  return x;
}

async function login({ email, password }) {
  let user = await userModel.findOne({ email });

  if (user) {
    let passOk = bcrypt.compareSync(password, user.password);

    if (passOk) {
      user = user.toJSON();

      if (user.password) {
        delete user.password;
      }

      let token = jwt.sign(user, process.env.JWT_SECRET);
      return token;
    } else {
      return "";
    }
  }
}

module.exports = { register, login };
