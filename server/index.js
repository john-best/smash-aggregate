const express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var axios = require("axios");
var qs = require("querystring");
var mysql      = require('mysql');
var credentials = require("./credentials");

var connection = mysql.createConnection({
  connectionLimit: 10,
  multipleStatements: true,
  host     : credentials.mysql_host,
  user     : credentials.mysql_user,
  password : credentials.mysql_password,
  database : credentials.mysql_database
});

var connected = false;
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
  connected = true
});

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());




// get fighter data
app.get("/fighter/:fighter", (req, res, next) => {
  if (!connected) {
    res.json({success: false, error: "Could not connect to the database!"})
  }

  var sql = "SELECT * FROM fighters WHERE url = ?; SELECT * FROM segments WHERE fighter = ? ORDER BY s_index ASC; SELECT * FROM discord_users WHERE server = ?";
  var inserts = [req.params.fighter, req.params.fighter, req.params.fighter]
  sql = mysql.format(sql, inserts)

  // still gotta get matchups and links if segment type is "links"
  // also need to parse this input to make it more friendly for the front end to deal with
  connection.query(sql, function(error, results, fields) {
    if (error !==  null) {
      console.log(error)
      res.json(JSON.stringify(error));
    }

    res.json(JSON.parse(JSON.stringify(results)));
  })
});

// save fighter data (edit mode), need to check authorization
app.post("/fighter/:fighter", (req, res, next) => {
  if (!connected) {
    res.json({success: false, error: "Could not connect to the database!"})
  }

  // check authorization here, return false if failed. also return false if user isn't allowed to modify

  // here we're proabably going to have to do multiple saves or something for each schema??
  // what happens when something gets deleted? how do we know?

  console.log(req.body);
  res.json({ status: "success" });
});

// check discord authorization here
app.post("/verify_oauth2", (req, res, next) => {
  axios
    .post(
      "https://discordapp.com/api/oauth2/token",
      qs.stringify({
        client_id: credentials.client_id,
        client_secret: credentials.client_secret,
        grant_type: "authorization_code",
        code: req.body.code,
        redirect_uri: req.body.uri,
        scope: "identify"
      }),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
      }
    )
    .then(response => {

      console.log(response.data)
      let access_token = response.data.access_token;
      let token_type = response.data.token_type;
      let refresh_token = response.data.refresh_token

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
          

          // TODO: check against db to see which fighters user can edit
          // but, we need react to store some sort of token so it sends it when we're saving...
          // can we just use the auth token given by discord? so we just check for authorization before saving
          res.json({ success: true, username, discriminator, user_id, access_token, refresh_token });
        })
        .catch(error => {
          console.log("There was an error grabbing user information.");
          console.log(error.response.data);
          res.send({
            success: false,
            error: "There was an error grabbing user information.",
            error2: error.response.data
          });
        });
    })
    .catch(error => {
      console.log("There was an error generating an access token.");
      console.log(error.response.data)
      res.send({
        success: false,
        error: "There was an error generating an access token.",
        error2: error.response.data
      });
    });
});

// just check if the token is valid or not
// TODO: actually we need to check the access_token and not the code oops
app.post("/check_oauth2", (req, res, next) => {
  axios
    .post(
      "https://discordapp.com/api/oauth2/token",
      qs.stringify({
        client_id: credentials.client_id,
        client_secret: credentials.client_secret,
        grant_type: "authorization_code",
        code: req.body.code,
        redirect_uri: req.body.uri,
        scope: "identify"
      }),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
      }
    )
    .then(response => {
      res.json({valid: true})
    }).catch(error => {
      res.json({valid: false})
    });
});

app.listen(3001, () => console.log("Example app listening on port 3001!"));
