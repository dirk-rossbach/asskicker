import React from 'react'
import './mobilegamescreen.scss'

import axios from 'axios'

import RetroButton from '../../components/RetroButton/Retrobutton'

export default function MobileGameScreen(props) {
  const goal = () => {
    axios.post(
      'http://localhost:3000/match/goal',
      { team: props.team },
      (data) => {
        console.log(data)
      },
    )
  }
  const ungoal = () => {
    axios.post(
      'http://localhost:3000/match/ungoal',
      { team: props.team },
      (data) => {
        console.log(data)
      },
    )
  }
  return (
    <div
      className="screen-wrapper"
      style={{ backgroundColor: props.team === "0" ? process.env.REACT_APP_TEAM1_BGCOLOR : process.env.REACT_APP_TEAM2_BGCOLOR }}
    >
      <span onClick={(e) => goal(e)}>
        <RetroButton text="GOAL"></RetroButton>
      </span>
      <span onClick={(e) => ungoal(e)}>
        <RetroButton text="Ungoal"></RetroButton>
      </span>
    </div>
  )
}
