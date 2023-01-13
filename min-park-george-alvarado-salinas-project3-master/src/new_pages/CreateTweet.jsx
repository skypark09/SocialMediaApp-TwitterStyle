import React from "react";
import Axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import "../index.css";

export default function CreateTweet() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    Axios.get("/api/user/isLoggedIn")
      .then(() => {
        setLoggedIn(true);
      })
      .catch((err) => {
        setLoggedIn(false);
        console.log(err);
      });
  }, []);
  const [tweetInput, setTweetInput] = useState({
    name: "",
  });

  function onTweetInput(e) {
    const name = e.target.value;
    setTweetInput({
      ...tweetInput,
      name,
    });
  }

  function onNotLoggedIn() {
    navigate("/");
  }
  function onSubmit() {
    Axios.post("/api/tweet", tweetInput)
      .then(function (response) {})
      .finally(function () {
        setTweetInput({
          name: "",
        });
      })
      .catch((err) => {
        navigate("/");
      });
    navigate("/");
  }

  if (loggedIn) {
    return (
      <div className="page-body">
        <div className="title-tag">Add new Tweet:</div>
        <div className="spacing-style">
          <div className="input-field">
            {" "}
            <input
              value={tweetInput.name}
              className="input-field"
              onInput={onTweetInput}
            />
          </div>
        </div>
        <div className="spacing-style">
          <button onClick={onSubmit}>Submit</button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="page-body">
        <div className="title-tag">Not Logged In</div>
        <div className="spacing-style">
          <div className="input-field">Click the button below to go home!</div>
        </div>
        <div className="spacing-style">
          <button onClick={onNotLoggedIn}></button>
        </div>
      </div>
    );
  }
}
