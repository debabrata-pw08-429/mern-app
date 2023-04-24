require("dotenv").config();
const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  userLike: { type: Boolean, default: true},
  likes: { type: Number },
  comments: { type: Number },
  reshare: { type: Number},
  days: { type: String },
  content: {
    textContent: { type: String },
    imgContent: { type: String },
  },
  hashtags: [{ type: String }],
  user: {
    userId: String,
    email: String
}
});

const postModel = mongoose.model("post", postSchema);
module.exports = postModel;
