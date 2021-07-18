import React, { Component } from "react";
import "./highscore.scss";

class Highscore extends Component {
  render() {
    const players = [];
    this.props.players
      .sort(this.compareByPoints)
      .reverse()
      .forEach((player, index) => {
        let rating_duo = player.rating.duo.toFixed(2);
        players.push(
          <tr key={index} className={index < 3 ? "top3" : ""}>
            <td>{index + 1}</td>
            <td>{rating_duo}</td>
            <td>{player.id}</td>
          </tr>
        );
      });
    return (
      <span className="">
        <table className="highscores">
          <thead>
            <tr className="header">
              <th>RANK</th>
              <th>SCORE</th>
              <th>NAME</th>
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
