const express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var axios = require("axios");
var qs = require("querystring");
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
  axios
    .post(
      "https://discordapp.com/api/oauth2/token",
      qs.stringify({
        client_id: credentials.client_id,
        client_secret: credentials.client_secret,
        grant_type: "authorization_code",
        code: req.query.code,
        redirect_uri: "http://localhost:3001/authorization",
        scope: "identify"
      }),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
      }
    )
    .then(response => {
      let access_token = response.data.access_token;
      let token_type = response.data.token_type;

      axios
        .get("https://discordapp.com/api/users/@me", {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: token_type + " " + access_token
          }
        })
        .then(response => {
          let username = response.data.username;
          let discriminator = response.data.discriminator;
          let user_id = response.data.id;

          res.json({ success: true, username, discriminator, user_id });
        })
        .catch(error => {
          console.log("There was an error grabbing user information.");
          console.log(error);
          res.json({
            success: false,
            error: "There was an error grabbing user information."
          });
        });
    })
    .catch(error => {
      console.log("There was an error generating an access token.");
      console.log(error);
      res.json({
        success: false,
        error: "There was an error generating an access token."
      });
    });
});

app.listen(3001, () => console.log("Example app listening on port 3001!"));
