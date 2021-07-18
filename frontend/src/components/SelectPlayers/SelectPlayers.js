import React, { Component } from "react";
import PlayerMatrix from "./PlayerMatrix";
import "./selectPlayers.scss";

class SelectPlayers extends Component {
  constructor(props) {
    super(props);
    this.state = { team0: ["dirk", "fred"], team1: ["knall", "frosch"] };
  }

  onTeamChanged = (data) => {
    console.log(data);
  };

  render() {
    const team0 = [];
    this.state.team0.forEach((e) => {
      team0.push(<div>{e}</div>);
    });
    const team1 = [];
    this.state.team1.forEach((e) => {
      team1.push(<div>{e}</div>);
    });
    return (
      <div className="selectPlayers">
        <div className="wrapper team0">{team0}</div>
        <PlayerMatrix
          teamChanged={this.onTeamChanged}
          players={this.props.players}
          team0={["dirk", "fred"]}
          team1={["knall", "frosch"]}
        ></PlayerMatrix>
        <div className="wrapper team1">{team1}</div>
      </div>
    );
  }
}
export default SelectPlayers;
