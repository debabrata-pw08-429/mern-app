const userModel = require("../Models/usersModel");

// Edit function for existing users_
async function edit(id, data) {
  let editObject = {
    ...data,
  };

  let x = await userModel.findByIdAndUpdate(id, editObject);
  return x;
}

module.exports = { edit };
