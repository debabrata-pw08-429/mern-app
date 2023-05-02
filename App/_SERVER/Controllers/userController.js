const { postModel } = require("../Models/postsModel");
const userModel = require("../Models/usersModel");
const fs = require('fs');

// Edit function for existing users_
async function edit(id, data) {
  let editObject = {
    ...data,
  };

  let x = await userModel.findByIdAndUpdate(id, editObject);
  return x;
}

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
async function imageUpload(files) {
  let images = [];
  for (let i = 0; i < files.length; i++) {
    const imgPath = files[i].path;
    const imgName = files[i].originalname;
    const buffer = fs.readFileSync(imgPath);
    const imageData = new postModel({ images: [{ data: buffer, contentType: 'image/*' }], imageName: imgName });
    const savedData = await imageData.save();
    images.push(savedData);
    console.log(images)
    fs.unlinkSync(imgPath); 
  }
  return images;
}
// async function imageUpload(file){
//   // const client = new MongoClient(process.env.DB_URL);
    
//   // client.connect(function(err) {
//     // const db = client.db('kooapp');
//     // const collection = db.collection('images');
//     let x
//     for(var i=0;i<file.length;i++){
//       var img = await fs.readFile(file[i].path);
//       x=await postModel.insertMany({images: new Buffer.from(img, 'base64') }, function(err, result) {
       
//       if (err) {
//           res.send({ success: false, message: 'Error uploading image' });
//         } else {
//           res.send({ success: true, message: 'Image uploaded successfully' });
//         }
//       })
//       x.save();
//     }
//     return x;
//   // });
// }


module.exports = { edit, postByUser, imageUpload };
