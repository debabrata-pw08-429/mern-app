const express = require("express");
const authRouter = express.Router();
const { register, login } = require("../Controllers/authController");

// /auth/register ==> To register a new user.
authRouter.post("/auth/register", async (req, res) => {
  try {
    let body = req.body;
    let data = await register(body);
    let userexists;
    if (data === "User Alredy Exists !") {
      userexists = true;
    }
    res.send(userexists);
  } catch (error) {
    res
      .status(500)
      .send({ error: error.message, message: "Registration Error!" });
  }
});

// /auth/login ==> For logging in generating a token
authRouter.post("/auth/login", async (req, res) => {
  try {
    let token = await login(req.body);

    if (token === "") {
      res.status(500).send("Wrong Creds!");
    } else {
      res.cookie("token", token).send("Cookies Added!");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = authRouter;
