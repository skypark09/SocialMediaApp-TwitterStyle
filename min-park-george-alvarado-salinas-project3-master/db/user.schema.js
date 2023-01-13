const Schema = require("mongoose").Schema;

exports.UserSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    password: String,
  },
  { collection: "user" }
);
