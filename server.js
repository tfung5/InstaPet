const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const path = require("path");
const passport = require("passport");

// Express Initialization
const app = express();

// Require .env config
require("dotenv").config();

// Grab or initialize port
const port = parseInt(process.env.PORT, 10) || 5000;

// Set port
app.set("port", port);

// Logger
app.use(logger("dev"));

// Use bodyParser middleware to parse requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Require Passport config
require("./config/passport");

// Use Passport middleware
app.use(passport.initialize());

// Obtain routes
const users = require("./routes/users");
const posts = require("./routes/posts");
const comments = require("./routes/comments");

// Use routes
app.use("/accounts", users);
app.use("/p", posts);
app.use("/c", comments);

// Heroku post-build script
// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Have app listen to port ####
app.listen(port, () => console.log(`Server up! Listening on port ${port}`));

module.exports = app;
