const mongoose = require("mongoose");
require("dotenv").config();

const CONNECT = async () => {
  const URL = process.env.DB_URL;
  await mongoose.connect(URL);
};

module.exports = CONNECT;
