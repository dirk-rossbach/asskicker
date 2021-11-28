import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import "./selectscreen.scss";

import axios from "axios";

import SelectPlayers from "../../components/SelectPlayers/SelectPlayers";
import RetroButton from "../../components/RetroButton/Retrobutton";
import Background from "../../components/Background/Background";

function SelectScreen() {
  const team0 = useRef([]);
  const team1 = useRef([]);
  const teamsChanged = (t0, t1) => {
    team0.current = t0;
    team1.current = t1;
  }
  let [players, setPlayers] = useState([]);
  const history = useHistory();
  useEffect(() => {
    axios.get("http://localhost:3000/roster/players").then((res) => {
      setPlayers(res.data);
    });
  }, [])


  const startMatch = () => {
    axios.post("http://localhost:3000/match/start", [team0.current, team1.current]).then(res => {
      history.push("/match");
    });
  }

  return (
    <div className="select_wrapper">
      <div className="select_rows">
        <div className="select_element">
          <SelectPlayers onTeamsChanged={teamsChanged} players={players}></SelectPlayers>
        </div>
        <div className="select_element button">
          <span onClick={startMatch}>
            <RetroButton color="yellow" text="Start Match"></RetroButton>
          </span>
        </div>
      </div>
      <Background darken="50" />
    </div>
  );

}



export default SelectScreen;
