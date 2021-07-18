import React, { Component } from "react";
import "./matchscreen.scss";

import Scoreboard from "../../components/Scoreboard/Scoreboard";
import RetroButton from "../../components/RetroButton/Retrobutton";

class MatchScreen extends Component {
  render() {
    return (
      <div class="score_wrapper">
        <Scoreboard></Scoreboard>
        <RetroButton color="red" text="foo"></RetroButton>
        <RetroButton color="green" text="foo"></RetroButton>
        <RetroButton color="blue" text="foo"></RetroButton>
        <RetroButton text="clicky"></RetroButton>
      </div>
    );
  }
}
export default MatchScreen;
