const express = require("express");
const { matchRoute, rosterRoute } = require("./routes");
const { match } = require("./db-service");

const { goalEvent } = require("./event-service");

const app = express();
const websocket = require("express-ws")(app);
const port = 3000;

goalEvent.on("goal", () => {
  websocket.getWss().clients.forEach((client) => {
    client.send(JSON.stringify(getCurrentScore()));
  });
});

function getCurrentScore() {
  const teams = match.get().teams;
  return [teams[0].goals.length, teams[1].goals.length];
}

app.use(express.static("public"));
app.use(express.json());
app.use("/match", matchRoute);
app.use("/roster", rosterRoute);

app.ws("/score", function (ws, req) {
  ws.on("message", () => {
    ws.send(JSON.stringify(getCurrentScore()));
  });
});

app.listen(port, () => {
  console.log(`asskicker listening at http://localhost:${port}`);
});
