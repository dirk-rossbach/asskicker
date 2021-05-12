
const express = require("express");
const { home, roster } = require("./routes");

const db = require("./db-service");

const app = express();
const port = 3000;

app.use(express.json());
app.use("/", home);
app.use("/roster", roster);

/*
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
*/

const pool = ["andi", "max", "michael", "dirk"];
for(let name of pool) {
  db.match.addPlayerToRandomTeam(name);
  let match = db.match.get();
  console.log(match.teams[0].players, match.teams[1].players);
}

db.match.shufflePlayers();
match = db.match.get();
console.log(match.teams[0].players, match.teams[1].players);

db.match.reset();
