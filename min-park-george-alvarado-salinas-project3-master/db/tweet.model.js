const mongoose = require("mongoose");

const TweetSchema = require("./tweet.schema").TweetSchema;

const TweetModel = mongoose.model("Tweet", TweetSchema);

function insertTweet(tweet) {
  return TweetModel.create(tweet);
}

function getAllTweets() {
  return TweetModel.find().sort({ date: -1 }).exec();
}

function getTweetById(id) {
  return TweetModel.findById(id).exec();
}
// Not implemented but would be used to delete.
function deleteByTweetId(id) {
  return TweetModel.deleteOne({ _id: id });
}

// This in theory would get the Id and Tweet given and update one
// that is already in the database.  Not entirely sure if possible
// to get two things into this function with one api call.
// Also, name is the thing being set because that is what we had as our
// Tweet variable in the schema.
function editByTweetId(id, tweet) {
  return TweetModel.updateOne({ _id: id }, { $set: { name: tweet } });
}

function getTweetByUser(user) {
  return TweetModel.find({
    user: user,
  }).exec();
}

module.exports = {
  insertTweet,
  getAllTweets,
  getTweetById,
  getTweetByUser,
};
