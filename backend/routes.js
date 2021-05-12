var express = require("express");
const home = express.Router();
const roster = express.Router();

/* match API */
home.get("/", (req, res, next) => {
  res.end("Welcome to You in Contact Page");
});

/* roster API */
roster.get("/player", (req, res, next) => {
  res.send("works");
  next();
});
roster.post("/player", (req, res, next) => {
  console.log(req.body);
  res.send("post player works");
  next();
});

module.exports = { home, roster };
