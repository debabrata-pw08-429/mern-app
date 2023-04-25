const { postModel } = require("../Models/postsModel");

async function findPost(id) {
  let x = await postModel.findById(id);

  return x;
}

module.exports = { findPost };
