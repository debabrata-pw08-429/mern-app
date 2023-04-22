const googleAuthRouter = require("express").Router();
const passport = require("passport");

googleAuthRouter.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

googleAuthRouter.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/auth/protected",
    failureRedirect: "/auth/google/failure",
  })
);

async function isLoggedIn(req, res, next) {
  req.user ? next() : res.status(401).send("Not Authorised!");
}

googleAuthRouter.get("/auth/protected", isLoggedIn, (req, res) => {
  let name = req.user.displayName;
  console.log(req.user._json);
  res.send(`Hello ${name} ! `);
});

googleAuthRouter.get("/auth/google/failure", (req, res) => {
  res.send("Google oauth Failure!");
});

googleAuthRouter.get("/auth/logout", (req, res) => {
  req.session.destroy((err) => {
    res.redirect("/");
  });
});

module.exports = googleAuthRouter;
