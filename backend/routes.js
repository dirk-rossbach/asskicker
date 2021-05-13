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

/* Players */
const demo = [
  {
    id: 1,
    name: "Dirk Rossbach",
    avatar: "https://ca.slack-edge.com/TC4REAN2E-U019E3DPLKG-933a2bc5a716-512",
  },
  {
    id: 2,
    name: "Max Eise",
    avatar: "https://ca.slack-edge.com/TC4REAN2E-U018VCHE9PS-4c71f5ae1d5b-512",
  },
  {
    id: 3,
    name: "Andreas Fendl",
    avatar: "https://ca.slack-edge.com/TC4REAN2E-UJV5TKZE0-531f5544a457-512",
  },
  {
    id: 4,
    name: "Michael Henke",
    avatar: "https://ca.slack-edge.com/TC4REAN2E-U01V2AJJJNS-6e31e0a75d86-512",
  },
];

/* match API */
matchRoute.post("/start", (req, res, next) => {
  // get playes from request and do something ..
  const team0 = req.body[0];
  const team1 = req.body[1];
  //ToDo: check if players exist
  match.start(req.body);
  res.send("start match");
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
rosterRoute.get("/player", (req, res) => {
  console.log();
});
rosterRoute.post("/player", (req, res) => {
  players.create(req.body.name);
  res.send("post player works");
});
rosterRoute.get("/players", (req, res) => {
  res.json(demo);
});

rosterRoute.get("/player/qr/:name.png", (req, res) => {
  QRCode.toBuffer(req.params.name).then((qr) => {
    res.setHeader("Content-Type", "image/png");
    res.end(qr);
  });
});

module.exports = { matchRoute: matchRoute, rosterRoute: rosterRoute };
