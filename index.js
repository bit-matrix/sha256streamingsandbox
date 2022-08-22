const express = require("express");
const app = express();
const path = require("path");
const axios = require("axios");
const sha256streaming = require("@bitmatrix/sha256streaming");
const https = require("https");
const sslRedirect = require("heroku-ssl-redirect");
const bodyParser = require("body-parser");
const core = require("cors");

app.use(cors());

// enable ssl redirect
app.use(sslRedirect.default());

// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/sha256initialize", (req, res) => {
  const param1 = req.body.param1;
  const sha256contextResult = sha256streaming.sha256Initializer(param1);
  res.send(200, sha256contextResult);
});

app.get("/result", (req, res) => {
  const { text } = req.query;
  const sha256contextResult = sha256context(text);

  res.render("result.ejs", { result: sha256contextResult });
});

app.listen(process.env.PORT || 3005, function () {
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
