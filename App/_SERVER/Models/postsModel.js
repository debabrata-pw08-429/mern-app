require("dotenv").config();
const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  userLike: { type: Boolean, default: true },
  likes: { type: Number, default: 35 },
  comments: { type: Number, default: 11 },
  reshare: { type: Number, default: 5 },
  days: { type: String, default: "5 days" },
  images:{type: [Object], default: new Array() },
  videos:{type: [Object], default: new Array() },
  textContent: { type: String },
  hashtags: [{ type: String }],
  user: {
    userId: { type: String },
    email: { type: String },
  },
});

const postModel = mongoose.model("post", postSchema);
module.exports = { postModel, postSchema };
