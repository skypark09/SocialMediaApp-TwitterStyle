import Axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import "./Register.css";

export default function Register() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function updatePassword(event) {
    setPassword(event.target.value);
  }

  function updateUserName(event) {
    setUserName(event.target.value);
  }

  function createUser() {
    Axios.post("/api/user/register", {
      name: userName,
      password,
    })
      .then(function (response) {
        navigate("/");
        location.reload();
      })
      .catch((err) => {
        setErrorMessage("Username already Exists");
      });
  }
  return (
    <div className="page-body">
      <div className="title-tag">Create New User</div>
      <div className="spacing-style">
        <label className="input-field">Username:</label>
        <input type="text" onInput={updateUserName}></input>
      </div>
      <div className="spacing-style">
        <label className="input-field">Password:</label>
        <input type="password" onInput={updatePassword}></input>
      </div>
      <div className="spacing-style">
        <button onClick={createUser}>Register</button>
      </div>
      <div className="spacing-style">{errorMessage}</div>
    </div>
  );
}
