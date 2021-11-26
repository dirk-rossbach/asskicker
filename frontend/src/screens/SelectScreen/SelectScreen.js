import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./selectscreen.scss";

import axios from "axios";

import SelectPlayers from "../../components/SelectPlayers/SelectPlayers";
import RetroButton from "../../components/RetroButton/Retrobutton";

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
      <div className="select_wrapper">
        <div className="select_rows">
          <div className="select_element">
            <SelectPlayers players={this.state.players}></SelectPlayers>
          </div>
          <div className="select_element button">
            <Link to="/match">
              <RetroButton color="yellow" text="Start Match"></RetroButton>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
export default SelectScreen;
