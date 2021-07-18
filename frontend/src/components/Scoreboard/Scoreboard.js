import React, { Component } from "react";
import "./scoreboard.scss";

export default class Scoreboard extends Component {
  render() {
    return (
      <div>
        <div className="scoreboard">
          <span>{this.props.score1}</span>:<span>{this.props.score2}</span>
        </div>
      </div>
    );
  }
}
