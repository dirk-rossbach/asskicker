import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./scorescreen.scss";
import axios from "axios";

import Highscore from "../../components/Highscore/Highscore";
import RetroButton from "../../components/RetroButton/Retrobutton";
import Background from "../../components/Background/Background";

class ScoreScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { players: [] };
  }
  componentDidMount() {
    axios.get("http://localhost:3000/roster/players").then((res) => {
      this.setState({ players: res.data });
    });
  }
  render() {
    return (
      <div className="score_wrapper">
        <header>
          <h1 className="blink_me">TOP 10 HIGHSCORES</h1>
          <Highscore players={this.state.players} />
          <Link to="/select">
            <RetroButton color="red" text="Start Match" target="select"></RetroButton>
          </Link>

          <Background darken="50" />
        </header>
      </div>
    );
  }
}
export default ScoreScreen;
