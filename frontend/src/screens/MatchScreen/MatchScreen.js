import React from "react";
import { useState } from "react";
import "./matchscreen.scss";

import Scoreboard from "../../components/Scoreboard/Scoreboard";
import Background from "../../components/Background/Background";
import RetroButton from "../../components/RetroButton/Retrobutton";

import { w3cwebsocket as W3CWebSocket } from "websocket";
import axios from "axios";

const client = new W3CWebSocket("ws://localhost:3000/score");

// Endpoint for GET Players
//const endpoint = "http://localhost:3000/roster/players";

/* const GetPlayers = () => {
  axios.get("http://localhost:3000/roster/players").then((res) => {
    this.setState({ players: res.data });
  });
}; */

// Team YELLOW = team0
// Team BLACK = team1

export default function Match({ data }) {
  console.log(data);
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);

  // Handle ADD Goals on Button clicks
  const AddGoal = (team) => {
    console.log("Goal for team ", team);
    // POST Goal with team either 0 or 1
    axios
      .post("http://localhost:3000/match/goal", {
        team: team,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    if (team === "1") {
      //setScore1(score1 + 1);
    } else if (team === "2") {
      //setScore2(score2 + 1);
    } else {
      console.log("Error in Team number");
    }
  };
  // Handle REMOVE Goals on Button clicks
  const UnGoal = (team) => {
    console.log("Ungoal for team ", team);
    // POST Ungoal
    axios
      .post("http://localhost:3000/match/ungoal", {
        team: team,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    if (team === "1" && score1[0] >= 0) {
      //setScore1(score1 - 1);
    } else if (team === "2" && score2[0] >= 0) {
      //setScore2(score1 - 1);
    } else {
      console.log("Error in Team number");
    }
  };
  const setScore = (team0, team1) => {
    console.log(team0, team1);
  };

  // Fire if error
  client.onerror = () => {
    console.log("Connection Error");
  };
  // When connection is established
  client.onopen = () => {
    console.log("Client connected");
    // Send inital score value
    client.send("0");
  };
  client.onmessage = (e) => {
    if (typeof e.data === "string") {
      setScore1(e.data[1]);
      setScore2(e.data[3]);
      console.log("Received: ", e.data);
    }
  };

  return (
    <div className="score_wrapper">
      <div>
        <Scoreboard score1={score1} score2={score2}></Scoreboard>
        <div className="players">
          <table>
            <tr className="">
              <td className="left heading">Team 1</td>
              <td className="right heading">Team 2</td>
            </tr>
            <tr className="team2">
              <td className="left player">1234</td>
              <td className="right player">Player 21</td>
            </tr>
            <tr className="team2">
              <td className="left player">Player 12</td>
              <td className="right player">Player 22</td>
            </tr>
          </table>
        </div>
        <div className="controls">
          <RetroButton
            color="yellow"
            text="Goal Yellow"
            onClick={() => {
              AddGoal("0");
            }}
          ></RetroButton>
          <RetroButton
            color="black"
            text="Goal Black"
            onClick={() => {
              AddGoal("1");
            }}
          ></RetroButton>
        </div>
      </div>
    </div>
  );
}
