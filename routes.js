const express = require("express");
const { players } = require("./db-service");

const match = express.Router();
const roster = express.Router();

/* match API */
match.post("/", (req, res, next) => {
  res.end("Welcome to You in Contact Page");
});



/* roster API */
roster.get("/player", (req, res, next) => {
  console.log();

  next();
});
roster.post("/player", (req, res, next) => {
  players.create(req.body.name);
  res.send("post player works");
  next();
});

roster.get("/players", (req, res, next) => {
    res.json(players.getAll());
})

module.exports = { match, roster };
