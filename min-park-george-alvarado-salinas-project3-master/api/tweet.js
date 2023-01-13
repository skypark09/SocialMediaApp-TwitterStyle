const express = require("express");

const TweetModel = require("../db/tweet.model");

const router = express.Router();

router.get("/", function (request, response) {
  return TweetModel.getAllTweets()
    .then(function (data) {
      response.send(data);
    })
    .catch(function (err) {
      response.status(400);
      response.send(err);
    });
});

router.get("/tweetsByUser", function (request, response) {
  const userName = request.cookies.user;

  if (userName) {
    return TweetModel.getTweetsByUser(userName)
      .then(function (data) {
        response.send(data);
      })
      .catch(function (err) {
        response.status(400);
        response.send(err);
      });
  } else {
    return response.status(400).send("No token available");
  }
});

router.get("/user", function (request, response) {
  const user = request.cookies.userName;

  return TweetModel.getTweetByUser(user).then(function (tweetResult) {
    return response.send(tweetResult);
  });
});

router.get("/user/:user", function (request, response) {
  const user = request.params.user;

  return TweetModel.getTweetsByUser(user).then(function (tweetResult) {
    return response.send(tweetResult);
  });
});

router.get("/:tweetId/", function (req, res) {
  const tweetId = req.params.tweetId;

  return TweetModel.getTweetById(tweetId).then(function (tweetResult) {
    return res.send(tweetResult);
  });
});

router.post("/", function (request, response) {
  const body = request.body;
  return TweetModel.insertTweet(body)
    .then(function (data) {
      response.send(data);
    })
    .catch(function (err) {
      response.status(400);
      response.send(err);
    });
});

module.exports = router;
