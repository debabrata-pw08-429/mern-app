// IMPORTs_
const express = require("express");
const passport = require("passport");
require("dotenv").config();
require("./Configs/Passport");
const googleAuthRouter = require("./Routes/oauthRoutes");
const session = require("express-session");
const adminRouter = require("./Routes/adminRoutes");
const CONNECT = require("./Configs/connection");
const userRouter = require("./Routes/userRoutes");
const postRouter = require("./Routes/postRoutes");
const app = express();

// USE_
app.use(express.json());
app.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(googleAuthRouter);
app.use(adminRouter);
app.use(userRouter);
app.use(postRouter);

// LOGIC_
app.get("/", (req, res) => {
  res.send("Server is Working Fine!");
});

// CONNECT & LISTEN_
const PORT = process.env.SERVER_PORT;
CONNECT().then(() => {
  app.listen(PORT, () => {
    console.log("Server started at :", PORT);
  });
});
