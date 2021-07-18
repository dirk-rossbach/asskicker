import React, { Component } from "react";
import "./matchscreen.scss";

import Scoreboard from "../../components/Scoreboard/Scoreboard";
import Background from "../../components/Background/Background";
import RetroButton from "../../components/RetroButton/Retrobutton";

class MatchScreen extends Component {
  render() {
    return (
      <div className="score_wrapper">
        <div>
          <Scoreboard></Scoreboard>
          <div className="players">
            <table>
              <tr className="">
                <td className="left heading">Team 1</td>
                <td className="right heading">Team 2</td>
              </tr>
              <tr className="team2">
                <td className="left player">Player 11</td>
                <td className="right player">Player 21</td>
              </tr>
              <tr className="team2">
                <td className="left player">Player 12</td>
                <td className="right player">Player 22</td>
              </tr>
            </table>
          </div>
          <div className="controls">
            <RetroButton color="yellow" text="Goal Yellow"></RetroButton>
            <RetroButton color="black" text="Goal Black"></RetroButton>
          </div>
          <Background />
        </div>
      </div>
    );
  }
}
export default MatchScreen;
