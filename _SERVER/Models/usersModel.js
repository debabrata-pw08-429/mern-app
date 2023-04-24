require("dotenv").config();
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String },
  username: { type: String },
  email: { type: String, max: 50, unique: true },
  password: {
    type: String,
    required: true,
    default: process.env.RANDOM_PASSWORD,
  },
  bio: { type: String, default: "" },
  profilePicture: {
    type: String,
    default: "https://www.kooapp.com/img/profilePlaceholderYellow.svg",
  },
  followers: { type: Number, default: 0 },
  following: { type: Number, default: 0 },
  posts: { type: Array, default: [] },
  profileImgs: { type: [String], default: new Array(10) },
  activityLikes: [],
  activityComments: [],
  category: { type: String },
});

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
