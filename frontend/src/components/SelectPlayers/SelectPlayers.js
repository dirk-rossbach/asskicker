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
      team0.push(<span>{e}</span>);
    });
    const team1 = [];
    this.state.team1.forEach((e) => {
      team1.push(<span>{e}</span>);
    });
    return (
      <div className="selectPlayers">
        <div className="wrapper team0">
          <table>
            <tr>
              <td>
                <p>1: {team0[0]}</p>
              </td>
            </tr>
            <td>2: {team0[1]}</td>
          </table>
        </div>
        <PlayerMatrix teamChanged={this.onTeamChanged} players={this.props.players} team0={["dirk", "fred"]} team1={["knall", "frosch"]}></PlayerMatrix>
        <div className="wrapper team1">
          <table>
            <tr>
              <td>
                <p>1: {team1[0]}</p>
              </td>
            </tr>
            <td>2: {team1[1]}</td>
          </table>
        </div>
      </div>
    );
  }
}
export default SelectPlayers;
