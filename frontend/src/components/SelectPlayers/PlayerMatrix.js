import React, { Component } from "react";
import PlayerCell from "./PlayerCell";
import "./playermatrix.scss";

export default class PlayerMatrix extends Component {
  constructor(props) {
    super(props);
    this.textInput = null;
    this.state = {
      players: []
    }
  };

  setTextInputRef = (element) => {
    this.textInput = element;
  };

  handleKeyPress = (e) => {
    //LEFT
    if (e.keyCode === 37) {
      this.props.teamChanged({
        team0: document.querySelector(".active.playercell .playerID")
          .textContent,
      });
    }
    //RIGHT
    if (e.keyCode === 39) {
      this.props.teamChanged({
        team1: document.querySelector(".active.playercell .playerID")
          .textContent,
      });
    }
  };

  componentDidUpdate(prevProps) {
    if (prevProps.players !== this.props.players) {
      this.setState({ players: this.props.players });
    }
  }
  handleChange = () => {
    this.setState({ active: 0 });
    this.filterPlayers();
  };

  filterPlayers() {
    const filtered = this.props.players.filter((player) =>
      player.id.toLowerCase().startsWith(this.textInput.value.toLowerCase())
    );
    this.setState({ players: filtered });
  }
  onPlayerSelected = (teamId, player) => {
    this.props.teamChanged(teamId, player);
  }

  render() {
    const players = [];
    this.state.players.forEach((player, index) => {
      players.push(
        <PlayerCell
          playerSelected={this.onPlayerSelected}
          active={index === this.state.active}
          key={"player_" + index}
          player={player}
        ></PlayerCell>
      );
    });
    return (
      <div>
        {/* <input
          maxLength="3"
          ref={this.setTextInputRef}
          onChange={this.handleChange}
        ></input> */}
        <div
          tabIndex="0"
          className="playermatrix"
          /* onKeyDown={this.handleKeyPress} */
        >
          {players}
        </div>
      </div>
    );
  }
}

