const express = require("express");

const db = require("./db-service");

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

db.players.create("dirk");

console.log(db.players.getAll());
