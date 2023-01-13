const express = require("express");

const UserModel = require("../db/user.model");

const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/register", function (request, response) {
  const user = request.body;

  return UserModel.createUser(user)
    .then(function (userData) {
      const cookie = {
        userName: userData.name,
      };

      const token = jwt.sign(cookie, "GeorgesSECRET", {
        expiresIn: "14d",
      });

      return response
        .cookie("jwt_token", token, { httpOnly: true })
        .status(200)
        .send({ username: userData.name });
    })
    .catch(function (error) {
      console.log(error);
      return response.status(400).send("Error: User cannot be created");
    });
});

router.post("/authenticate", function (req, res) {
  const username = req.body.name;
  const password = req.body.password;
  UserModel.getUserByName(username).then((user) => {
    if (user.password === password) {
      const cookie = {
        userName: user.name,
      };

      const token = jwt.sign(cookie, "GeorgesSECRET", {
        expiresIn: "14d",
      });

      return res
        .cookie("jwt_token", token, { httpOnly: true })
        .status(200)
        .send({ username });
    } else {
      return res.status(400).send("The password does not work");
    }
  });
});

router.get("/isLoggedIn", function (request, response) {
  const jwt_token = request.cookies.jwt_token;

  if (!jwt_token) {
    return response.status("401").send("No token present!");
  }

  return jwt.verify(jwt_token, "GeorgesSECRET", function (err, decoded) {
    if (err) {
      return response.status(400).send("Invalid token");
    } else {
      const userName = decoded.userName;

      return response.status(200).send("All logged in!");
    }
  });
});

router.post("/logOut", function (request, response) {
  return response
    .cookie(
      "jwt_token",
      {},
      {
        maxAge: 0,
      }
    )
    .send("Successfully logged");
});

module.exports = router;
