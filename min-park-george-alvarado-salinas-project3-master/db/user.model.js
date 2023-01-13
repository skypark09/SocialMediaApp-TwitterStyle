const mongoose = require("mongoose");

const UserSchema = require("./user.schema").UserSchema;

const UserModel = mongoose.model("user", UserSchema);

function createUser(user) {
  return UserModel.create(user);
}

function getUserByName(name) {
  return UserModel.findOne({
    name,
  }).exec();
}

module.exports = {
  createUser,
  getUserByName,
};
