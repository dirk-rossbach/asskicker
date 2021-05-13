const express = require("express");
const { matchRoute, rosterRoute } = require("./routes");

const app = express();
const port = 3000;

app.use(express.json());
app.use("/match", matchRoute);
app.use("/roster", rosterRoute);

app.listen(port, () => {
  console.log(`asskicker listening at http://localhost:${port}`);
});
