import React, { Component } from "react";
import "./selectscreen.scss";

import SelectPlayers from "../../components/SelectPlayers/SelectPlayers";
import RetroButton from "../../components/RetroButton/Retrobutton";

class SelectScreen extends Component {
  render() {
    return (
      <div class="select_wrapper">
        <SelectPlayers players={this.state.players}></SelectPlayers>
        <RetroButton color="red" text="foo"></RetroButton>
        <RetroButton color="green" text="foo"></RetroButton>
        <RetroButton color="blue" text="foo"></RetroButton>
        <RetroButton text="clicky"></RetroButton>
      </div>
    );
  }
}
export default SelectScreen;
