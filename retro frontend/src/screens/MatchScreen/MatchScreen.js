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
              <tr>
                <td>1</td>
                <td>2</td>
              </tr>
              <tr>
                <td>1</td>
                <td>2</td>
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
