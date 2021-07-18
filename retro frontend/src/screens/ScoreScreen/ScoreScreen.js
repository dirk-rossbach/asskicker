import React, { Component } from "react";
import "./scorescreen.scss";
import axios from "axios";

import Highscore from "../../components/Highscore/Highscore";
import RetroButton from "../../components/RetroButton/Retrobutton";

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
      <div class="score_wrapper">
        <Highscore players={this.state.players} />
        <RetroButton color="red" text="Start Match"></RetroButton>
      </div>
    );
  }
}
export default ScoreScreen;
