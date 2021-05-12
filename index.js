const express = require("express");
const { home, roster } = require("./routes");

const db = require("./db-service");

const app = express();
const port = 3000;

app.use(express.json());
app.use("/", home);
app.use("/roster", roster);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

db.players.create("dirk");

console.log(db.players.getAll());
