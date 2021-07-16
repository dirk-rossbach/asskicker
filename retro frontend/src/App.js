import { Component } from "react";
import "./App.scss";
import Highscore from "./components/Highscore/Highscore";
import SelectPlayers from "./components/SelectPlayers/SelectPlayers";
import axios from "axios";
import RetroButton from "./components/RetroButton/Retrobutton";
import Scoreboard from "./components/Scoreboard/Scoreboard";
import { w3cwebsocket as W3CWebSocket } from "websocket";

const client = new W3CWebSocket("ws://localhost:3000/score");

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { players: [] };
  }

  componentWillMount() {
    client.onopen = () => {
      console.log("WebSocket Client Connected");
    };
    client.onmessage = (message) => {
      console.log(message);
    };
  }

  componentDidMount() {
    axios.get("http://localhost:3000/roster/players").then((res) => {
      this.setState({ players: res.data });
    });
  }
  handleClick = (e) => {
    console.log(111);
    alert(22);
  };

  render() {
    return (
      <span>
        <Highscore players={this.state.players} />
        <SelectPlayers players={this.state.players}></SelectPlayers>
        <RetroButton text="clicky"></RetroButton>
        <RetroButton color="red" text="foo"></RetroButton>
        <RetroButton color="green" text="foo"></RetroButton>
        <RetroButton color="blue" text="foo"></RetroButton>
        <Scoreboard></Scoreboard>
      </span>
    );
  }
}

export default App;
