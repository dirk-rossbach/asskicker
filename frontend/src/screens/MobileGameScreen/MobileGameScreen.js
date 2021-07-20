import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./mobilegamescreen.scss";
import { w3cwebsocket as W3CWebSocket } from "websocket";

import RetroButton from "../../components/RetroButton/Retrobutton";
import Scoreboard from "../../components/Scoreboard/Scoreboard";


class MobileGameScreen extends Component {

    client = new W3CWebSocket("ws://localhost:3000/score");

    componentDidMount() {
        // Fire if error
        this.client.onerror = () => {
            console.log("Connection Error");
        };
        // When connection is established
        this.client.onopen = () => {
            console.log("Client connected");
            // Send inital score value
            this.client.send("0");
        };
        this.client.onmessage = (e) => {
            if (typeof e.data === "string") {
                // setScore1(e.data[1]);
                // setScore2(e.data[3]);
            }
        };
    }
    render() {
        return (
            <Scoreboard score1="1" score2="5"></Scoreboard>
        );
    }
}
export default MobileGameScreen;
