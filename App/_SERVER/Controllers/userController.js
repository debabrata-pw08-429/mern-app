const { log } = require("console");
const { postModel } = require("../Models/postsModel");
const userModel = require("../Models/usersModel");
const fs = require("fs");

// Edit function for existing users_
async function edit(id, data) {
  let editObject = {
    ...data,
  };

  let x = await userModel.findByIdAndUpdate(id, editObject);
  return x;
}

// Post function for existing users_
async function postByUser(id, details) {
  let user = await userModel.findById(id);

  let dataObj = {
    ...details,
    user: {
      userId: user.id,
      email: user.email,
    },
  };

  user.posts.push(dataObj);

  let x = user;
  x.save();
  return x;
}

// For Image file upload_
async function imageUpload(files, text) {
  let images = [];
  let videos = [];

  for (let i = 0; i < files.length; i++) {
    const filePath = files[i].path;
    const fileName = files[i].originalname;
    const fileType = files[i].mimetype;
    const bufferFileData = fs.readFileSync(filePath);

    if (fileType == "image/png") {
      const singleImgData = {
        data: new Buffer.from(bufferFileData, "base64"),
        contentType: "image/*",
        imageName: fileName,
      };
      images.push(singleImgData);
      fs.unlinkSync(filePath);
    } else {
      const singleVideoData = {
        data: new Buffer.from(bufferFileData, "base64"),
        contentType: "video/*",
        videoName: fileName,
      };

      videos.push(singleVideoData);
      fs.unlinkSync(filePath);
    }
  }

  const fileData = new postModel({
    images: images,
    videos: videos,
    textContent: text,
  });

  await fileData.save();
  return fileData;
}

module.exports = { edit, postByUser, imageUpload };
