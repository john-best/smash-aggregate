const express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var axios = require("axios");
const app = express();
var credentials = require("./credentials");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// get fighter data
app.get("/fighter/:fighter", (req, res, next) => {
  let fighter_url = req.params.fighter;
  res.json({ fighter_name: req.params.fighter });
});

// save fighter data (edit mode), need to check authorization
app.post("/fighter/:fighter", (req, res, next) => {
  console.log(req.body);
  res.json({ status: "success" });
});

// check discord authorization here
app.get("/authorization", (req, res, next) => {
  console.log(req.query);

  console.log(req.query.code);
  let discord_token = req.query.code;

  let data = JSON.stringify({
    client_id: credentials.client_id,
    client_secret: credentials.client_secret,
    grant_type: "authorization_code",
    code: discord_token,
    redirect_uri: "http://localhost:3001/authorization",
    scope: "identify"
  });

  axios
    .post("https://discordapp.com/api/oauth2/token", data, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" }
    })
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    });

  res.json({ status: "success" });
});

app.listen(3001, () => console.log("Example app listening on port 3001!"));
