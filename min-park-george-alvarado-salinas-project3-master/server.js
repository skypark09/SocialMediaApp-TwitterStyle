const express = require("express");
const TweetRoute = require("./api/tweet");
const UserRoute = require("./api/user");
const HelperFunctions = require("./helper");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const path = require("path");

const obj = {
  banana: "yellow",
  apple: "red",
};

// const banana = obj.banana;
// const apple = obj.apple;
const { banana, apple } = obj;

const app = express();

app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/tweet", TweetRoute);
app.use("/api/user", UserRoute);

app.get("/api/goodbye", (req, res) => {
  res.send("Goodbye, Web Dev");
});

app.use(express.static(path.join(__dirname, "build")));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// This Endpoint works with Heroku and Render.
const mongoEndpoint =
  process.env.MONGODB_URI || "mongodb://127.0.0.1/collection_name";

// I used this to make my local machine connect to mongo.
// let mongoEndpoint =
//   "mongodb+srv://gas12241:Imawesome12241$@gcluster.fwv7u01.mongodb.net/?retryWrites=true&w=majority";
if (process.env.MONGO) {
  mongoEndpoint = process.env.MONGO;
}
mongoose.connect(mongoEndpoint, { useNewUrlParser: true });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Error connecting to MongoDB:"));

app.listen(process.env.PORT || 8000, () => {
  console.log("Starting server...?");
});
