const { edit } = require("../Controllers/userController");
const userRouter = require("express").Router();
const multer=require('multer')

//File destination setup for multer
const fileStorageEngine=multer.diskStorage({
  destination:(req,file,cb)=>{
      cb(null,'./public/Image')
  },
  filename:(req,file,cb)=>{
      cb(null,Date.now()+ "--" + file.originalname)
  }
})
const upload=multer({storage:fileStorageEngine})

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

userRouter.post("/uploads",upload.array('avatars',5),(req,res)=>{
  console.log(req.files)
  res.send("Files uploaded")
})

module.exports = userRouter;
