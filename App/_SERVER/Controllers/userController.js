const userModel = require("../Models/usersModel");

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

module.exports = { edit, postByUser };
