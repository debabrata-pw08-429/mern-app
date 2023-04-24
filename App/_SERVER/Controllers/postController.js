const postModel = require("../Models/postsModel");


async function addNewPost(data) {
  let x = await postModel.create({
    ...data,
  });

  return x;
}

module.exports = { addNewPost };
