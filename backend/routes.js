const express = require("express"),
  { players, match } = require("./db-service"),
  QRCode = require("qrcode");

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

rosterRoute.get("/player/qr/:name.png", (req, res) => {
  QRCode.toBuffer(req.params.name).then((qr) => {
    res.setHeader("Content-Type", "image/png");
    res.end(qr);
  });
});

module.exports = { matchRoute: matchRoute, rosterRoute: rosterRoute };
