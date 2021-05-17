import React, { Component } from "react";
import "./highscore.scss";

class Highscore extends Component {
  render() {
    const players = [];
    this.props.players
      .sort(this.compareByPoints)
      .reverse()
      .forEach((player, index) => {
        players.push(
          <tr key={index} className={index < 3 ? "top3" : ""}>
            <td>{index + 1}</td>
            <td>{player.id}</td>
            <td>{player.rating.duo}</td>
          </tr>
        );
      });
    return (
      <span>
        <h1 className="blink_me">TOP 10 HIGHSCORES</h1>
        <table className="highscores">
          <thead>
            <tr className="header">
              <th>RANK</th>
              <th>NAME</th>
              <th>POINTS</th>
            </tr>
          </thead>
          <tbody>{players}</tbody>
        </table>
      </span>
    );
  }

  compareByPoints = function (player1, player2) {
    return player1.points - player2.points;
  };
}
export default Highscore;
