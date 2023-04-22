const { addNewUser } = require("../Controllers/adminController");
const adminRouter = require("express").Router();

// Add new Users from Admin side_
adminRouter.post("/admin", async (req, res) => {
  try {
    let userDetails = req.body;
    let savedData = await addNewUser(userDetails);
    res.send({
      data: savedData,
    });
  } catch (error) {
    res.status(500).json({ error: error, message: "Admin Post Method Error!" });
  }
});

module.exports = adminRouter;
