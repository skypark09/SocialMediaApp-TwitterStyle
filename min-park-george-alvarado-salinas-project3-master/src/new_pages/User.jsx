import React from "react";
import "./User.css";
import { useState } from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

const userprofile = {
  name: "George Alvardo-Salinas",
  username: "@geemongee",
  date: "12/24",
  description:
    "This is the optional description on a fixed user page.  This would have been used as the template for a user page!",
};

export default function User() {
  const [tweets, setTweets] = useState([]);
  const [tweetInput, setTweetInput] = useState({
    name: "",
  });

  function getAllTweetData() {
    Axios.get("/api/tweet").then(function (response) {
      setTweets(response.data);
    });
  }

  useEffect(function () {
    getAllTweetData();
  }, []);

  function onTweetInput(e) {
    const name = e.target.value;
    setTweetInput({
      ...tweetInput,
      name,
    });
  }

  function onSubmit() {
    Axios.post("/api/tweet", tweetInput)
      .then(function (response) {
        getAllTweetData();
      })
      .finally(function () {
        setTweetInput({
          name: "",
        });
        location.reload();
      });
  }
  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }
  const tweet_components = [];
  for (let i = 0; i < tweets.length; i++) {
    const tweet = tweets[i];
    const tweet_component = (
      <div className="tweet-components">
        <NavLink className="pretty-link" to={"/" + tweet._id}>
          {tweet.name}
        </NavLink>
        <date>{formatDate(tweet.date)}</date>
        <br />
        <br />
        <br />
      </div>
    );
    tweet_components.push(tweet_component);
  }

  return (
    <div className="page-styling">
      <div className="box-styling">
        <div className="name-styling">{userprofile.name}</div>
      </div>
      <div className="box-styling">
        <div className="username-styling">{userprofile.username}</div>
      </div>
      <div className="box-styling">
        <div className="description-styling">{userprofile.description}</div>
      </div>
      <div className="title-tag">Add new Tweet:</div>
      <div className="spacing-style">
        <div className="input-field">
          <input value={tweetInput.name} onInput={onTweetInput} />
        </div>
      </div>
      <div>
        <button onClick={onSubmit}>Submit</button>
      </div>
      <div>{tweet_components}</div>
    </div>
  );
}
