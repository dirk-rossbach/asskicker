import React, { Component } from "react";
import "./selectscreen.scss";

import axios from "axios";

import SelectPlayers from "../../components/SelectPlayers/SelectPlayers";
import RetroButton from "../../components/RetroButton/Retrobutton";
import Background from "../../components/Background/Background";

class SelectScreen extends Component {
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
      <div class="select_wrapper">
        <SelectPlayers players={this.state.players}></SelectPlayers>
        <Background />
      </div>
    );
  }
}
export default SelectScreen;
