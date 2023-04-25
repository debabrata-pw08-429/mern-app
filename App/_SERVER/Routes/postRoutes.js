const { findPost } = require("../Controllers/postController");
const { postByUser } = require("../Controllers/userController");
const postRouter = require("express").Router();

// Add new Posts from
postRouter.post("/create/:id", async (req, res) => {
  try {
    let postDetails = req.body;
    let userId = req.params.id;

    let userInfo = await postByUser(userId, postDetails);

    res.send({
      data: userInfo,
    });
  } catch (error) {
    res.status(500).json({ error: error, message: "Post Method Error!" });
  }
});

// Get Post by postID_
postRouter.get("/post/:id", async (req, res) => {
  try {
    let postID = req.params.id;

    let post = await findPost(postID);

    res.send({
      data: post,
    });
  } catch (error) {
    res.status(500).json({ error: error, message: "Get Post Method Error!" });
  }
});

module.exports = postRouter;
