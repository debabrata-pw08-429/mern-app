const { addNewPost } = require("../Controllers/postController");
const postRouter = require("express").Router();

// Add new Posts from 
postRouter.post("/post", async (req, res) => {
  try {
    let postDetails = req.body;
    let postData = await addNewPost(postDetails);
    res.send({
      post: postData,
    });
  } catch (error) {
    res.status(500).json({ error: error, message: "Post Method Error!" });
  }
});

module.exports = postRouter;
