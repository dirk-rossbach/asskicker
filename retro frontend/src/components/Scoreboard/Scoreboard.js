import React, { Component } from "react";
import "./scoreboard.scss";

import RetroButton from "../RetroButton/Retrobutton";

export default class Scoreboard extends Component {
  render() {
    return (
      <div>
        <div className="scoreboard">
          <span>5</span>:<span>3</span>
        </div>
      </div>
    );
  }
}
