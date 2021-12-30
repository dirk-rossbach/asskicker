import React, { useState } from 'react'
import './matchscreen.scss'

import { nanoid } from 'nanoid'

import Scoreboard from '../../components/Scoreboard/Scoreboard'
import RetroButton from '../../components/RetroButton/Retrobutton'

import { w3cwebsocket as W3CWebSocket } from 'websocket'
import axios from 'axios'
import { useEffect } from 'react/cjs/react.development'
import MatrixDisplay from '../../components/MatrixDisplay/MatrixDisplay'
import MatrixDisplayInput from '../../components/MatrixDisplay/MatrixDisplayInput'

const client = new W3CWebSocket('ws://localhost:3000/score')

export default function Match({ data }) {
  const [score0, setScore0] = useState('0')
  const [score1, setScore1] = useState('0')

  const [team0, setTeam0] = useState([])
  const [team1, setTeam1] = useState([])
  const [isMatchRunning, setMatchRunning] = useState(false)
  useEffect(() => {
    axios.get('http://localhost:3000/match/current').then((res) => {
      if (res.data.start === 0) {
        setMatchRunning(false)
      } else {
        setMatchRunning(true)
        setTeam0(res.data.teams[0])
        setTeam1(res.data.teams[1])
        setScore0(res.data.teams[0].goals.length.toString())
        setScore1(res.data.teams[1].goals.length.toString())
      }
    })
  }, [])

  // Handle ADD Goals on Button clicks
  const AddGoal = (team) => {
    // POST Goal with team either 0 or 1
    axios
      .post('http://localhost:3000/match/goal', {
        team: team,
      })
      .then(function (response) {})
      .catch(function (error) {})

    if (team === '1') {
      //setScore1(score1 + 1);
    } else if (team === '2') {
      //setScore2(score2 + 1);
    } else {
    }
  }
  // Handle REMOVE Goals on Button clicks
  const UnGoal = (team) => {
    // POST Ungoal
    axios
      .post('http://localhost:3000/match/ungoal', {
        team: team,
      })
      .then(function (response) {})
      .catch(function (error) {})
    if (team === '1' && score0[0] >= 0) {
      //setScore1(score1 - 1);
    } else if (team === '2' && score1[0] >= 0) {
      //setScore2(score1 - 1);
    } else {
    }
  }
  const setScore = (team0, team1) => {}

  // Fire if error
  client.onerror = () => {}
  // When connection is established
  client.onopen = () => {
    // Send inital score value
    client.send('0')
  }
  client.onmessage = (e) => {
    if (typeof e.data === 'string') {
      setScore0(e.data[1].toString())
      setScore1(e.data[3].toString())
    }
  }

  const team0Out = () => {
    if (!team0.players) {
      return []
    }
    const players = []
    team0.players.forEach((element, index) => {
      players.push(
        <span className="playerName" key={'p_' + index}>
          {getPlayerNameAsMatrix(element.id)}
        </span>,
      )
    })
    return players
  }
  const team1Out = () => {
    if (!team1.players) {
      return []
    }
    const players = []
    team1.players.forEach((element, index) => {
      players.push(
        <span className="playerName" key={'p_' + index}>
          {getPlayerNameAsMatrix(element.id)}
        </span>,
      )
    })
    return players
  }
  const getPlayerNameAsMatrix = (playerName) => {
    const matrices = []
    for (let i = 0; i < playerName.length; i++) {
      matrices.push(
        <MatrixDisplay
          key={nanoid()}
          char={playerName[i]}
          cellSize={8}
          color={getColorByIndex(i)}
        ></MatrixDisplay>,
      )
    }
    return matrices
  }

  const getColorByIndex = (index) => {
    switch (index) {
      case 1:
        return '#FC8F12'
      case 2:
        return '#FFE433'
      case 3:
        return '#6FCC43'
      case 4:
        return '#0DB8B5'

      default:
        return '#D92727'
    }
  }


  return (
    <div className="score_wrapper">
      {!isMatchRunning && <h2>No running match</h2>}
      {isMatchRunning && (
        <div className="scoreboard">
          {/* <MatrixDisplayInput></MatrixDisplayInput> */}
          <span className="score">
            <MatrixDisplay char={score0} color={getColorByIndex(1)}></MatrixDisplay>
            <MatrixDisplay char=":" color="#FFE433"></MatrixDisplay>
            <MatrixDisplay char={score1} color="#0DB8B5"></MatrixDisplay>
          </span>
          <span className="players">
            <span className="team">{team0Out()}</span>
            <span className="team">{team1Out()}</span>
          </span>
          {/* <div className="controls">
            <RetroButton
              color="yellow"
              text="Goal Yellow"
              onClick={() => {
                AddGoal("0");
              }}
            ></RetroButton>
            <RetroButton
              color="black"
              text="Goal Black"
              onClick={() => {
                AddGoal("1");
              }}
            ></RetroButton>
          </div> */}
        </div>
      )}
    </div>
  )
}
