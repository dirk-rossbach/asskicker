import { Component } from "react";
import "./App.scss";
import StartScreen from "./screens/StartScreen/StartScreen";
import ScoreScreen from "./screens/ScoreScreen/ScoreScreen";
import SelectScreen from "./screens/SelectScreen/SelectScreen";
import MatchScreen from "./screens/MatchScreen/MatchScreen";

import { useHistory, BrowserRouter as Router, Switch, Route, Redirect, Link } from "react-router-dom";

import { w3cwebsocket as W3CWebSocket } from "websocket";

const client = new W3CWebSocket("ws://localhost:3000/score");

class App extends Component {
  /* Connect Websocket with Backend */
  componentWillMount() {
    client.onopen = () => {
      console.log("WebSocket Client Connected");
    };
    client.onmessage = (message) => {
      console.log(message);
    };
  }

  render() {
    return (
      <Router>
        {/* Start & Redirect */}
        <Switch>
          <Route path="/">
            <Redirect exact from="/" to="/start" />
          </Route>
        </Switch>

        {/* Start Screen */}
        <Switch>
          <Route path="/start">
            <StartScreen></StartScreen>
          </Route>
        </Switch>

        {/* Highscore & Start Match Screen */}
        <Switch>
          <Route path="/scores">
            <ScoreScreen></ScoreScreen>
          </Route>
        </Switch>

        {/* Select Players Screen */}
        <Switch>
          <Route path="/select">
            <SelectScreen></SelectScreen>
          </Route>
        </Switch>

        {/* Match Screen */}
        <Switch>
          <Route path="/match">
            <MatchScreen></MatchScreen>
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
