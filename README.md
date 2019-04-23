Smash Aggregate
======================
_A Beginner's Info Hub_

A web application dedicated to aggregating character-specific resources for Super Smash Bros. Ultimate. This web application is open source, so feel free to contribute! (please!!) Check out a live version [here!](https://sa.johnbest.me)

Installation
-----------
This web application has a frontend (React) and a backend (Node/Express), so you'll need to run two different node instances for this to work. Ideally you'll move the `server` folder outside of this repository directory since it's not a part of the frontend. The only reason why the `server` folder is here is because making another repository for the backend didn't seem like it was worth the trouble.

To install the required packages needed, navigate to the root directory (where this README is) and do the following:
```
$ npm install
```

To install the packages for the frontend, navigate into the `server` directory and run the same command.

Running
-----------
To run the frontend, navigate to the root directory and do the following:
```
$ npm start
```

To run the backend, navigate to the `server` directory and do the following:
```
$ node index.js
```

Requirements
-----------
This web application won't work out of the box. You will need to create a `credentials.js` file for the backend, which should be placed in the `server` directory. In this file, you must include the following:
```js
module.exports = {
    client_id: "discord_client_id",
    client_secret: "discord_client_secret",
    mysql_host: "mysql.host.com",
    mysql_user: "mysql-username",
    mysql_password: "mysql-password",
    mysql_database: "mysql_database",
    ssl_key: "(optional) ssl key",
    ssl_cert: "(optional) ssl cert",
    ssl_ca: "(optional) ssl ca"
}
```

This web application uses MySQL/MariaDB as the database. A `db.sql` file has been provided to show the structure of the database. If you plan to not use HTTPS, you can remove the HTTPS server from `index.js`. You'll also need to update the API urls within the frontend (in the actions, and also the discord login in `Navbar.js`.

What's Next?
-----------
Obviously such an application is nearly impossible to maintain due to how the metagame progresses, so the ideal situation is to have volunteers from each Smashcord help update their respective character page. There will be a Discord bot that will streamline the process to gain access to editing the pages soon.

I'm also looking to try custom css on the frontend so a dark mode is possible, and potentially add more `segment` features. I will be looking into revamping the database layout and backend since it's not in an ideal state. Submit a pull request or contact me on Discord at John#9173 if you're willing to help!
