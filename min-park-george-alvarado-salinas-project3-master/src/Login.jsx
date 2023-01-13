import Axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    Axios.get("/api/user/isLoggedIn")
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function updatePassword(event) {
    setPassword(event.target.value);
  }

  function updateUserName(event) {
    setUserName(event.target.value);
  }

  function createUser() {
    Axios.post("/api/user/authenticate", {
      name: userName,
      password,
    })
      .then(function (response) {
        location.reload();
        navigate("/");
      })
      .catch((err) => {
        setErrorMessage("Invalid combination. Try again!");
      });
  }

  return (
    <div className="page-body">
      <div className="title-tag">Login with Existing User</div>
      <div className="spacing-style">
        <label className="input-field">Username:</label>
        <input type="text" onInput={updateUserName}></input>
      </div>
      <div className="spacing-style">
        <label className="input-field">Password:</label>
        <input type="password" onInput={updatePassword}></input>
      </div>
      <div className="spacing-style">
        <button onClick={createUser}>Log In</button>
      </div>
      <div className="spacing-style">{errorMessage}</div>
    </div>
  );
}
