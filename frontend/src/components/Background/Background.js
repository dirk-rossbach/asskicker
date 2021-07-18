import React from "react";

import "./background.scss";
import video from "../../styles/arcade_video.mp4";

export default class Background extends React.Component {
  render() {
    return (
      <div className={"darken " + this.props.darken}>
        <div className="video">
          <video className="video_tag" autoPlay loop playsInline muted>
            <source src={video} type="video/mp4" />
          </video>
        </div>
      </div>
    );
  }
}
