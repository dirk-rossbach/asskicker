import { Component } from 'react'
import './App.scss'
import StartScreen from './screens/StartScreen/StartScreen'
import ScoreScreen from './screens/ScoreScreen/ScoreScreen'
import SelectScreen from './screens/SelectScreen/SelectScreen'
import MatchScreen from './screens/MatchScreen/MatchScreen'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import MobileGameScreen from './screens/MobileGameScreen/MobileGameScreen'

class App extends Component {
  render() {
    return (
      <Router>
        {/* Start & Redirect */}
        {/*
        <Switch>
          <Route path="/">
            <Redirect exact from="/" to="/start" />
          </Route>
        </Switch>
        */}
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
        <Switch>
          <Route path="/control/y">
            <MobileGameScreen team="0"></MobileGameScreen>
          </Route>
          <Route path="/control/b">
            <MobileGameScreen team="1"></MobileGameScreen>
          </Route>
        </Switch>
      </Router>
    )
  }
}

export default App
