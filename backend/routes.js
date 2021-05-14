const e = require("express");
const express = require("express"),
  { players, match } = require("./db-service"),
  QRCode = require("qrcode");

const { goalEvent } = require("./event-service");

const matchRoute = express.Router();
const rosterRoute = express.Router();

/* testi
const teams = [["andi", "max"], ["michael", "dirk"]];
db.match.start(teams);

db.match.addGoal(0);
db.match.addGoal(1);
db.match.addGoal(1);
db.match.addGoal(1);
db.match.addGoal(0);
db.match.addGoal(1);
db.match.addGoal(1);
db.match.addGoal(1);

console.log(db.match.get());

db.match.end();

console.log(db.pastmatches.getAll());
*/

/* match API */
matchRoute.post("/start", (req, res, next) => {
  const team0 = req.body[0];
  const team1 = req.body[1];
  let falsePlayers = [];
  team0.forEach((player) => {
    if (!players.getByName(player)) {
      falsePlayers.push(player);
    }
  });
  team1.forEach((player) => {
    if (!players.getByName(player)) {
      falsePlayers.push(player);
    }
  });
  console.log(falsePlayers);
  if (falsePlayers.length == 0) {
    match.start(req.body);
    res.json({ MESSAGE: "start match" });
  } else {
    res.status(404).json({ ERROR: "Player not found", players: falsePlayers });
  }
  //ToDo: check if players exist
});
matchRoute.post("/end", (req, res, next) => {
  res.send("end match");
  // end match
});
matchRoute.post("/goal", (req, res, next) => {
  res.send("gooooaaal!!!");
  match.addGoal(req.body.team);
  goalEvent.emit("goal");
  // update score for ws frontends
  // match.get()
});
matchRoute.post("/ungoal", (req, res, next) => {
  res.send("removed last goal");
  // update score for ws frontends
  // match.get()
});

/* roster API */
rosterRoute.get("/player/:name", (req, res) => {
  const player = players.getByName(req.params.name);
  if (player) {
    res.json(player);
  } else {
    res
      .status(404)
      .json({ ERROR: "Player not found", players: req.params.name });
  }
});
rosterRoute.post("/player", (req, res) => {
  try {
    players.create(req.body.name);
    res.json({ MESSAGE: `player ${req.body.name} created` });
  } catch (error) {
    res.status(409).json({ ERROR: "player already exits" });
  }
});
rosterRoute.get("/players", (req, res) => {
  const playerList = players.getAll();
  res.json(playerList);
});

rosterRoute.get("/player/qr/:name.png", (req, res) => {
  QRCode.toBuffer(req.params.name).then((qr) => {
    res.setHeader("Content-Type", "image/png");
    res.end(qr);
  });
});

module.exports = { matchRoute: matchRoute, rosterRoute: rosterRoute };
