import React, { Component } from "react";
import PlayerMatrix from "./PlayerMatrix";

class SelectPlayers extends Component {
  render() {
    return <PlayerMatrix players={this.props.players}></PlayerMatrix>;
  }
}
export default SelectPlayers;
