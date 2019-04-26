var mysql = require("mysql");
var credentials = require("./credentials");

var pool = mysql.createPool({
  multipleStatements: true,
  host: credentials.mysql_host,
  user: credentials.mysql_user,
  password: credentials.mysql_password,
  database: credentials.mysql_database
});

module.exports = {
  query: function() {
    var sql_args = [];
    var args = [];
    for (var i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }
    var callback = args[args.length - 1]; //last arg is callback
    pool.getConnection(function(err, connection) {
      if (err) {
        console.log(err);
        return callback(err);
      }
      if (args.length > 2) {
        sql_args = args[1];
      }
      connection.query(args[0], sql_args, function(err, results) {
        connection.release(); // always put connection back in pool after last query
        if (err) {
          console.log(err);
          return callback(err);
        }
        callback(null, results);
      });
    });
  }
};
