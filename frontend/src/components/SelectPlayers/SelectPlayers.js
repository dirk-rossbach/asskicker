import React, { Component } from "react";
import PlayerMatrix from "./PlayerMatrix";
import "./selectPlayers.scss";

class SelectPlayers extends Component {
  constructor(props) {
    super(props);
    this.state = { team0: [], team1: [], allPlayers: [] };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.players !== this.props.players) {
      const allP = this.props.players;
      allP.sort(this.comparePlayers);
      this.setState({ allPlayers: allP });
    }
  }

  onTeamChanged = (teamId, player) => {
    const allP = this.state.allPlayers;
    allP.splice(allP.indexOf(player), 1)
    if (teamId === 0) {
      const team = this.state.team0;
      team.push(player);
      this.setState({ team0: team, allPlayers: allP })
    } else if (teamId === 1) {
      const team = this.state.team1;
      team.push(player);
      this.setState({ team1: team, allPlayers: allP });
    }
    this.props.onTeamsChanged(this.state.team0, this.state.team1);
  };

  removePlayer = (teamId, player) => {
    if (teamId === 0) {
      const team = this.state.team0;
      team.splice(team.indexOf(player), 1);
      this.setState({ team0: team });
    } else if (teamId === 1) {
      const team = this.state.team1;
      team.splice(team.indexOf(player), 1);
      this.setState({ team1: team });
    }
    const allP = this.state.allPlayers;
    allP.push(player);
    allP.sort(this.comparePlayers);
    this.setState({ allPlayers: allP });
    this.props.onTeamsChanged(this.state.team0, this.state.team1);
  }

  comparePlayers = (a, b) => {
    if (a.id < b.id) {
      return -1;
    } else if (a.id > b.id) {
      return 1;
    }
    return 0;
  }

  render() {
    const team0 = [];
    this.state.team0.forEach((player, i) => {
      team0.push(
        <p key={"t0p" + i}>{player.id}<span onClick={(event) => this.removePlayer(0, player, event)} className="removePlayer"><span>x</span></span></p>
      )
    });
    const team1 = [];
    this.state.team1.forEach((player, i) => {
      team1.push(
        <p key={"t1p" + i}>{player.id}<span onClick={(event) => this.removePlayer(1, player, event)} className="removePlayer"><span>x</span></span></p>
      );
    });
    return (
      <div className="selectPlayers">
        <div className="wrapper team0">
          <div className="teamName"
            style={{ backgroundColor: process.env.REACT_APP_TEAM1_BGCOLOR, color: process.env.REACT_APP_TEAM1_COLOR }}>
            TEAM 1
          </div>
          <div>{team0}</div>
        </div>
        <PlayerMatrix teamChanged={this.onTeamChanged} players={this.state.allPlayers}></PlayerMatrix>
        <div className="wrapper team1">
          <div className="teamName"
            style={{ backgroundColor: process.env.REACT_APP_TEAM2_BGCOLOR, color: process.env.REACT_APP_TEAM2_COLOR }}>
            TEAM 2
          </div>
          <div>{team1}</div>
        </div>
      </div>
    );
  }
}
export default SelectPlayers;
