const express = require("express");
const { players, match } = require("./db-service");
const QRCode = require("qrcode");

const { goalEvent } = require("./event-service");

const matchRoute = express.Router();
const rosterRoute = express.Router();

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
  if (falsePlayers.length == 0) {
    try {
      match.start(req.body);
      res.json({ MESSAGE: "match started" });
    } catch (error) {
      res.status(409).json({ ERROR: error.message });
    }
  } else {
    res.status(404).json({ ERROR: "Player not found", players: falsePlayers });
  }
});
matchRoute.post("/end", (req, res, next) => {
  try {
    match.end();
    res.json({ MESSAGE: "end match" });
  } catch (error) {
    console.log(error);
    res.status(409).json({ ERROR: error.message });
  }
});
matchRoute.post("/goal", (req, res, next) => {
  res.json({ MESSAGE: "gooooaaal!!!" });
  match.addGoal(req.body.team);
  goalEvent.emit("goalchange");
});
matchRoute.post("/ungoal", (req, res, next) => {
  res.json({ MESSAGE: "removed last goal" });
  match.removeLastGoal();
  goalEvent.emit("goalchange");
});
matchRoute.post("/reset", (re, res, next) => {
  res.json({ MESSAGE: "match reset" });
  match.reset();
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
