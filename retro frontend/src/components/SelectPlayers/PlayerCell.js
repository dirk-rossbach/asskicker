import React, { Component } from "react";
import "./playercell.scss";

export default class PlayerCell extends Component {
  render() {
    const classes =
      this.props.active === true ? "active playercell" : "playercell";
    return (
      <span className={classes}>
        <span className="indicator">&lt;</span>
        <span className="playerID">{this.props.player.id}</span>
        <span className="indicator">&gt;</span>
      </span>
    );
  }
}
