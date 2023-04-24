const { edit } = require("../Controllers/userController");
const userRouter = require("express").Router();

// Edit route for User & must pass userID, not postID_
userRouter.put("/edit/:id", async (req, res) => {
  try {
    let userDetails = req.body;
    let userId = req.params.id;

    let editedData = await edit(userId, userDetails);
    editedData.save();

    res.send({
      data: editedData,
    });
  } catch (error) {
    res.status(500).json({ error: error, message: "Edit PUT Method Error!" });
  }
});

module.exports = userRouter;
