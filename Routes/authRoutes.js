const express = require("express");
const userRouter = express.Router();
const { register, login } = require("../Controllers/auth.controller");

// /auth/register ==> To register a new user.
userRouter.post("/auth/register", async (req, res) => {
  try {
    let body = req.body;
    let data = await register(body);
    res.send(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// /auth/login ==> For logging in generating a token
userRouter.post("/auth/login", async (req, res) => {
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

module.exports = userRouter;
