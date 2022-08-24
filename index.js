const express = require("express");
const app = express();
const path = require("path");
const axios = require("axios");
const Sha256Streaming = require("@bitmatrix/sha256streaming");

const sslRedirect = require("heroku-ssl-redirect");
const bodyParser = require("body-parser");
const cors = require("cors");

// enable ssl redirect
app.use(sslRedirect.default());

// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

// app.set("view engine", "ejs");

// app.set("views", path.join(__dirname, "views"));

app.listen(process.env.PORT || 8080);

app.get("/", (req, res) => {
  res.send("hello");
});

app.post("/sha256initialize", (req, res) => {
  const param1 = req.body.param1;

  console.log("param1", param1);
  console.log("Sha256streaming", Sha256Streaming.sha256Initializer(param1));

  const sha256contextResult = Sha256Streaming.sha256Initializer(param1);
  console.log("sha256contextResultSuccess", sha256contextResult);

  res.send(sha256contextResult);
});

// app.get("/result", (req, res) => {
//   const { text } = req.query;
//   const sha256contextResult = sha256context(text);

//   res.render("result.ejs", { result: sha256contextResult });
// });
