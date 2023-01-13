const Schema = require("mongoose").Schema;

exports.TweetSchema = new Schema(
  {
    name: String,
    user: String,
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "tweet" }
);
