import axios from "axios";

export default function Home() {
  const axios = require("axios");

  const players = {
    team1: ["max", "dirk"],
    team2: ["andi", "hank"],
  };
  // make POST Goal
  axios
    .post("http://localhost:3000/match/goal")
    .then((res) => {
      console.log("res", res.data);
    })
    .catch((err) => {
      console.log("error", err);
    });
  return (
    <div>
      <div className="">
        Hello {players.team1[0]} and {players.team1[1]}
      </div>
    </div>
  );
}
