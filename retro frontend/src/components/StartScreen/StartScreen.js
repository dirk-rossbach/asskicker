import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";

import Logo from "../Logo/Logo";
import "./startscreen.scss";
import video from "../../styles/arcade_video.mp4";

class StartScreen extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = () => {
    this.props.history.push("/highscore");
  };

  render() {
    return (
      <div className="wrapper" onClick={this.handleClick}>
        <div class="video">
          <video className="video_tag" autoPlay loop playsInline muted>
            <source src={video} type="video/mp4" />
          </video>
        </div>

        <header class="viewport-header">
          <p>
            <Logo></Logo>
            <h2 className="blink_me">Insert Coin</h2>
          </p>
        </header>
      </div>
    );
  }
}

export default withRouter(StartScreen);
