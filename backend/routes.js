const express = require("express");
const { players, match } = require("./db-service");

const matchRoute = express.Router();
const rosterRoute = express.Router();

/* match API */
matchRoute.post("/start", (req, res, next) => {
  // get playes from request and do something ..
  res.send("start match");
});
matchRoute.post("/end", (req, res, next) => {
    res.send("end match");
    // end match 
  });
matchRoute.post("/goal", (req, res, next) => {
    res.send("gooooaaal!!!");
    // update score for ws frontends
    // match.get()
});
matchRoute.post("/ungoal", (req, res, next) => {
  res.send("removed last goal");
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

module.exports = { matchRoute: matchRoute, rosterRoute: rosterRoute };
