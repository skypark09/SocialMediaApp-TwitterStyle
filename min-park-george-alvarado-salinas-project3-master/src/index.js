import React from "react";
import ReactDOM from "react-dom/client";
import AllMyTweet from "./tweet/AllMyTweet";
import TweetDetails from "./tweet/TweetDetails";
import Home from "./new_pages/Home";
import CreateTweet from "./new_pages/CreateTweet";
import User from "./new_pages/User";
import "./index.css";
import { useState } from "react";
import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Axios from "axios";

const root = ReactDOM.createRoot(document.getElementById("root"));

const reactRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/my-tweet",
    element: <AllMyTweet />,
  },
  {
    path: "/:tweetId",
    element: <TweetDetails />,
  },
  {
    path: "/user/:user",
    element: <TweetDetails />,
  },
  {
    path: "/user",
    element: <User />,
  },
  {
    path: "/create-tweet",
    element: <CreateTweet />,
  },
]);

function Header() {
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

  function logout() {
    Axios.post("/api/user/logOut").then(() => {
      location.reload();
    });
  }
  if (loggedIn) {
    return (
      <nav className="nav">
        <div>
          <a href="/" className="website-title">
            Witter
          </a>
        </div>
        <div className="nav-sideways">
          <a href="/user">User</a>
          <a href="/create-tweet">Create Tweet</a>
          <button onClick={logout}>Logout</button>
        </div>
      </nav>
    );
  } else {
    return (
      <nav className="nav">
        <div>
          <a href="/" className="website-title">
            Witter
          </a>
        </div>
        <div className="nav-sideways">
          <a href="/register">Register</a>
          <a href="/login">Login</a>
        </div>
      </nav>
    );
  }
}

root.render(
  <React.StrictMode>
    <Header />
    <RouterProvider router={reactRouter} />
  </React.StrictMode>
);
