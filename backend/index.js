const express = require("express");
const cors = require("cors");
const { matchRoute, rosterRoute } = require("./routes");

const { goalEvent } = require("./event-service");

const app = express();
const websocket = require("express-ws")(app);
const port = 3000;

goalEvent.on("goal", () => {
  websocket.getWss().clients.forEach((client) => {
    client.send("goal !!");
  });
});

app.use(express.static("public"));
app.use(express.json());
app.use(cors());
app.use("/match", matchRoute);
app.use("/roster", rosterRoute);

app.ws("/score", function (ws, req) {
  ws.on("message", () => {
    /* do something cool */
  });
});

app.listen(port, () => {
  console.log(`asskicker listening at http://localhost:${port}`);
});
