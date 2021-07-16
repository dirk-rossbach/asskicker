import { Component } from "react";
import "./App.scss";
import Highscore from "./components/Highscore/Highscore";
import SelectPlayers from "./components/SelectPlayers/SelectPlayers";
import axios from "axios";
import RetroButton from "./components/RetroButton/Retrobutton";
import Scoreboard from "./components/Scoreboard/Scoreboard";

import { useHistory, BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { w3cwebsocket as W3CWebSocket } from "websocket";

const client = new W3CWebSocket("ws://localhost:3000/score");

let history = useHistory();

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

  StartMatch = () => {
    history.push("/start");
  };

  render() {
    return (
      <Router>
        {/* Start Screen */}
        <Switch>
          <Route path="/start">
            <span>Startscreen</span>
          </Route>
        </Switch>

        {/* Highscore & Start Match Screen */}
        <Switch>
          <Route path="/highscore">
            <Highscore players={this.state.players} />
            <RetroButton color="red" text="Start Match" onClick={this.StartMatch}></RetroButton>
          </Route>
        </Switch>

        {/* Select Players Screen */}
        <Switch>
          <Route path="/select">
            <SelectPlayers players={this.state.players}></SelectPlayers>
            <RetroButton color="red" text="foo"></RetroButton>
            <RetroButton color="green" text="foo"></RetroButton>
            <RetroButton color="blue" text="foo"></RetroButton>
            <RetroButton text="clicky"></RetroButton>
          </Route>
        </Switch>

        {/* Match Screen */}
        <Switch>
          <Route path="/match">
            <Scoreboard></Scoreboard>
            <RetroButton color="red" text="foo"></RetroButton>
            <RetroButton color="green" text="foo"></RetroButton>
            <RetroButton color="blue" text="foo"></RetroButton>
            <RetroButton text="clicky"></RetroButton>
          </Route>
        </Switch>

        <span></span>
      </Router>
    );
  }
}

export default App;
