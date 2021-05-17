import React, { Component } from "react";
import PlayerCell from "./PlayerCell";
import "./playermatrix.scss";

export default class PlayerMatrix extends Component {
  constructor(props) {
    super(props);
    this.state = { active: 2 };
  }
  handleKeyPress = (e) => {
    if (e.keyCode === 38) {
      if (this.state.active === 0) {
        return;
      }
      this.setState({ active: this.state.active - 1 });
    } else if (e.keyCode === 40) {
      if (this.state.active === this.props.players.length - 1) {
        return;
      }
      this.setState({ active: this.state.active + 1 });
    }
  };

  render() {
    const players = [];
    this.props.players.forEach((player, index) => {
      players.push(
        <PlayerCell
          active={index === this.state.active}
          key={"player_" + index}
          player={player}
        ></PlayerCell>
      );
    });
    return (
      <div
        tabIndex="0"
        className="playermatrix"
        onKeyDown={this.handleKeyPress}
      >
        {players}
      </div>
    );
  }
}
