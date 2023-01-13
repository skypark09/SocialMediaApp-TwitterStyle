import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import "./Tweet.css";

export default function TweetDetails() {
  const params = useParams();
  const [tweet, setTweet] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(function () {
    const tweetId = params.tweetId;
    axios
      .get("/api/tweet/" + tweetId)
      .then(function (response) {
        const tweet = response.data;
        setTweet(tweet);
      })
      .catch(function (error) {
        setIsError(true);
      })
      .finally(function () {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Loading....</div>;
  }

  if (isError) {
    return <div>Could not find tweet with ID {params.tweetId}</div>;
  }

  return (
    <div className="page-body">
      <div>Details for Tweet:</div>
      <div>Tweet: {tweet.name}</div>
      <div>User: {tweet.user}</div>
      <div>Date: {tweet.date}</div>
    </div>
  );
}
