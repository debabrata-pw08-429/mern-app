require("dotenv").config();
const jwt = require("jsonwebtoken");

const AuthMiddleware = async (req, res, next) => {
  const { token } = req.cookies;

  let ok = await jwt.verify(token, process.env.JWT_SECRET);

  if (ok) {
    let users = await jwt.decode(token);
    req.user = users;
  }

  next();
};

module.exports = AuthMiddleware;
