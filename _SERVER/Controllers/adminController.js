const userModel = require("../Models/usersModel");

async function addNewUser(data) {
  let x = await userModel.create({
    ...data,
  });

  return x;
}

module.exports = { addNewUser };
