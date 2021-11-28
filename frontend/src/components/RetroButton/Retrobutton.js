import React, { Component } from "react";
import "./retrobutton.scss";

class RetroButton extends Component {
  render() {
    return (
      <button className={"retrobutton " + this.props.color}>
        {this.props.text}
      </button>
    );
  }
}
export default RetroButton;
