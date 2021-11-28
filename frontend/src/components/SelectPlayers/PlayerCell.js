import React, { Component } from "react";
import "./playercell.scss";

export default class PlayerCell extends Component {

  addToTeam = (teamId) => {
    this.props.playerSelected(teamId, this.props.player);
  }
  render() {
    return (
      <div className ="player_cell_wrapper">
        <div className="playerName">{this.props.player.id}</div>
        <div className="teamSelectButton" onClick={(e) => this.addToTeam(0, e)}
        style={{ backgroundColor: process.env.REACT_APP_TEAM1_BGCOLOR, color: process.env.REACT_APP_TEAM1_COLOR }}>&lt;</div>
        <div className="teamSelectButton" onClick={(e) => this.addToTeam(1, e)}
        style={{ backgroundColor: process.env.REACT_APP_TEAM2_BGCOLOR, color: process.env.REACT_APP_TEAM2_COLOR }}>&gt;</div>
      </div>
    )
  }
}
