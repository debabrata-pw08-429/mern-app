// IMPORTs_
const express = require("express");
const passport = require("passport");
require("dotenv").config();
require("./Configs/Passport");
const googleAuthRouter = require("./Routes/oauthRoutes");
const session = require("express-session");
const adminRouter = require("./Routes/adminRoutes");
const CONNECT = require("./Configs/connection");
const authRouter = require("./Routes/authRoutes");
const postRouter = require("./Routes/postRoutes");
const cors = require("cors");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const app = express();

// USE_
app.use(express.json());
app.use(cors());
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
app.use(authRouter);
app.use(postRouter);
app.post("/api/upload", upload.single("file"), (req, res) => {
  console.log(req.file);
  res.send("File uploaded successfully.");
});

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
