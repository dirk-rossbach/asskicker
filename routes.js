const express = require("express");
const { players, match } = require("./db-service");

const matchRoute = express.Router();
const rosterRoute = express.Router();

/* match API */
matchRoute.post("/", (req, res, next) => {
  res.end("Welcome to You in Contact Page");
});
matchRoute.post("/goal", (req, res, next) => {
    // update score for ws frontends
    // match.get()
});

/* roster API */
rosterRoute.get("/player", (req, res) => {
  console.log();
});
rosterRoute.post("/player", (req, res) => {
  players.create(req.body.name);
  res.send("post player works");
});

rosterRoute.get("/players", (req, res) => {
  res.json(players.getAll());
});

module.exports = { match: matchRoute, roster: rosterRoute };
