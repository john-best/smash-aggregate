const express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var axios = require("axios");
var qs = require("querystring");
var mysql = require("mysql");
var credentials = require("./credentials");

var connection = mysql.createConnection({
  //connectionLimit: 10,
  multipleStatements: true,
  host: credentials.mysql_host,
  user: credentials.mysql_user,
  password: credentials.mysql_password,
  database: credentials.mysql_database
});

var connected = false;
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
  connected = true;
});

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// get fighter data
app.get("/fighter/:fighter", (req, res, next) => {
  if (!connected) {
    res.json({ success: false, error: "Could not connect to the database!" });
  }

  var sql =
    "SELECT * FROM fighters WHERE url = ?; SELECT * FROM segments WHERE fighter = ? ORDER BY s_index ASC; SELECT * FROM discord_users WHERE server = ?; SELECT * FROM matchups WHERE fighter = ?;";
  var inserts = [
    req.params.fighter,
    req.params.fighter,
    req.params.fighter,
    req.params.fighter
  ];
  sql = mysql.format(sql, inserts);

  // still gotta get matchups and links if segment type is "links"
  // also need to parse this input to make it more friendly for the front end to deal with
  connection.query(sql, function(error, results, fields) {
    if (error !== null) {
      console.log(error);
      res.json(JSON.parse(JSON.stringify(error)));
    }

    json = JSON.parse(JSON.stringify(results));

    var segments = json[1];
    var link_segments = [];
    for (var i = 0; i < segments.length; i++) {
      if (segments[i].s_type === "links") {
        link_segments.push(segments[i]);
      }
    }

    var promises = [];
    for (var i = 0; i < link_segments.length; i++) {
      promises.push(
        new Promise(function(resolve, reject) {
          // links
          var sql =
            "SELECT * FROM links WHERE segment = ? ORDER BY segment, l_index ASC";
          var inserts = [link_segments[i].id];
          sql = mysql.format(sql, inserts);

          connection.query(sql, function(error, results, fields) {
            if (error !== null) {
              return reject(error);
            }

            var link_json = JSON.parse(JSON.stringify(results));
            return resolve(link_json);
          });
        })
      );
    }

    var all_links = [];
    Promise.all(promises).then(segments => {
      // for the sake of returning values faster, we'll let the client handle the data work.
      // we'll just return the data in this basic format
      segments.forEach(links => {
        links.forEach(link => {
          all_links.push(link);
        });
      });

      res.json({
        fighter: {
          ...json[0][0],
          matchups: json[3],
          segments: json[1],
          links: all_links,
          users: json[2]
        }
      });
    });
  });
});

// save fighter data (edit mode), need to check authorization
app.post("/fighter/:fighter", (req, res, next) => {
  if (!connected) {
    res.json({ success: false, error: "Could not connect to the database!" });
  }

  // check authorization here, return false if failed. also return false if user isn't allowed to modify
  axios
    .get("https://discordapp.com/api/users/@me", {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Bearer" + " " + req.body.access_token
      }
    })
    .then(response => {
      // 0 = users, 1 = segments, 2 = matchups
      var sql =
        "SELECT * FROM discord_users WHERE user_id = ? AND server = ?; SELECT * FROM segments WHERE fighter = ?; SELECT * FROM matchups WHERE fighter = ?";
      var inserts = [
        response.data.id,
        req.params.fighter,
        req.params.fighter,
        req.params.fighter,
        req.params.fighter
      ];
      sql = mysql.format(sql, inserts);

      connection.query(sql, function(error, results, fields) {
        // if error, exit out
        if (error) {
          res.json({ result: "failure", error: "Database error." });
          throw Error("Database error");
        }

        // if user not found, then they're not authorized to edit the page
        if (results[0].length === 0) {
          res.json({
            result: "failure",
            error: "User does not have access to save for this fighter."
          });
          return;
        }

        var fighter_data = JSON.parse(req.body.fighter_data);
        // description
        var sql = "UPDATE fighters SET description = ? WHERE url = ?;";
        var inserts = [fighter_data.description, req.params.fighter];

        // matchups

        matchups = JSON.parse(JSON.stringify(results[2]));
        fighter_data.matchups.forEach(matchup => {
          for (var key in matchup) {
            if (matchups.find(o => o.opponent === key)) {
              sql +=
                "UPDATE matchups SET m_text = ? WHERE fighter = ? AND opponent = ?;";
              inserts.push(matchup[key], req.params.fighter, key);
            } else {
              sql +=
                "INSERT INTO matchups (fighter, opponent, m_text) VALUES (?, ?, ?);";
              inserts.push(req.params.fighter, key, matchup[key]);
            }
          }
        });
        
        sql = mysql.format(sql, inserts);
        console.log(sql);

        // let's save these changes for now, because the next changes are going to be annoying...
        var segments = JSON.parse(JSON.stringify(results[1]));

        connection.query(sql, function(error, results, fields) {
          if (error) {
            res.json({ result: "failure", error: "Database error." });
            throw Error("Database error");
          }

          // ok so, the main thing here is that we need to check if the segment got deleted or added, or just edited...
          // ideally we send this information from the frontend but we can also try to derive the info here, which is annoying but
          // for now we'll do it here and move it over to the client soon(tm)

          // i think a nosql database might've been easier, or somehow i need to change how my db is set up so that this isn't so complex...
          // find which segments are old
          var old_ids = [];
          segments.forEach(segment => {
            old_ids.push(segment.id);
          });

          // find which segments are new
          var new_ids = [];
          fighter_data.segments.forEach(segment => {
            new_ids.push(segment.id);
          });

          // find which segements are to be updated
          var deleted_ids = old_ids.filter(x => !new_ids.includes(x));
          var added_ids = new_ids.filter(x => !old_ids.includes(x));
          var same_ids = old_ids.filter(x => new_ids.includes(x));

          var sql = "";
          var inserts = [];
          deleted_ids.forEach(id => {
            sql += "DELETE FROM segments WHERE id = ?;";
            inserts.push(id);
          });

          added_ids.forEach(id => {
            var segment = fighter_data.segments.find(
              segment => segment.id === id
            );
            sql +=
              "INSERT INTO segments (id, s_index, fighter, title, s_type, s_text) VALUES(?, ?, ?, ?, ?, ?);";
            inserts.push(
              segment.id,
              segment.index,
              req.params.fighter,
              segment.title,
              segment.type,
              segment.text
            );
          });

          // in the end, we update every possible segment and this is probably bad but i'm not good enough at sql to know what i'm actually doing
          same_ids.forEach(id => {
            var segment = fighter_data.segments.find(
              segment => segment.id === id
            );
            sql +=
              "UPDATE segments SET s_index = ?, title = ?, s_type = ?, s_text = ? WHERE id = ?;";
            inserts.push(
              segment.index,
              segment.title,
              segment.type,
              segment.text,
              segment.id
            );
          });

          sql += "SELECT * FROM links WHERE fighter = ?;";
          inserts.push(req.params.fighter);
          sql = mysql.format(sql, inserts);

          // OK, here we can do links, which is going to be the same thing...
          connection.query(sql, function(error, results, fields) {
            if (error) {
              res.json({ result: "failure", error: "Database error." });
              throw Error("Database error");
            }

            var old_links = JSON.parse(JSON.stringify(results));
            old_links = old_links[old_links.length - 1];

            if (old_links === undefined) {
              old_links = [];
            }

            var old_ids = [];
            old_links.forEach(link => {
              old_ids.push(link.id);
            });

            var new_ids = [];
            fighter_data.links.forEach(link => {
              new_ids.push(link.id);
            });

            // find which links are to be updated
            var deleted_ids = old_ids.filter(x => !new_ids.includes(x));
            var added_ids = new_ids.filter(x => !old_ids.includes(x));
            var same_ids = old_ids.filter(x => new_ids.includes(x));

            var sql = "";
            var inserts = [];
            deleted_ids.forEach(id => {
              sql += "DELETE FROM links WHERE id = ?;";
              inserts.push(id);
            });

            added_ids.forEach(id => {
              var link = fighter_data.links.find(link => link.id === id);
              sql +=
                "INSERT INTO links (id, l_index, link_type, url, title, segment, fighter) VALUES (?, ?, ?, ?, ?, ?, ?);";
              inserts.push(
                link.id,
                link.index,
                link.type,
                link.url,
                link.title,
                link.segment_id,
                req.params.fighter
              );
            });

            same_ids.forEach(id => {
              var link = fighter_data.links.find(link => link.id === id);
              sql +=
                "UPDATE links SET l_index = ?, link_type = ?, url = ?, title = ? WHERE id = ?;";
              inserts.push(
                link.index,
                link.type,
                link.url,
                link.title,
                link.id
              );
            });

            sql = mysql.format(sql, inserts);

            console.log(sql);

            if (sql === "") {
              res.json({ result: "success" });
            } else {
              connection.query(sql, function(error, results, fields) {
                if (error) {
                  res.json({ result: "failure", error: "Database error" });
                  console.log(error);
                  throw Error("Database error");
                }
                res.json({ result: "success" });
              });
            }
          });
        });
      });
    })
    .catch(error => {
      res.json({
        result: "failure",
        error: "Discord token authorization error"
      });
    });
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
      let access_token = response.data.access_token;
      let token_type = response.data.token_type;
      let refresh_token = response.data.refresh_token;

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
          res.json({
            success: true,
            username,
            discriminator,
            user_id,
            access_token,
            refresh_token
          });
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
      console.log(error.response.data);
      res.send({
        success: false,
        error: "There was an error generating an access token.",
        error2: error.response.data
      });
    });
});

app.post("/check_oauth2", (req, res, next) => {
  axios
    .get("https://discordapp.com/api/users/@me", {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Bearer" + " " + access_token
      }
    })
    .then(response => {
      console.log(response);
      res.json({ valid: true });
    })
    .catch(error => {
      res.json({ valid: false });
    });
});

app.listen(3001, () => console.log("Example app listening on port 3001!"));
