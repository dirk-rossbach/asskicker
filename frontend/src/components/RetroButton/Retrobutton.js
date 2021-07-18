import React, { Component } from "react";
import "./retrobutton.scss";

class RetroButton extends Component {
  handleClick = () => {};
  render() {
    return (
      <button onClick={this.handleClick} className={"retrobutton " + this.props.color}>
        {this.props.text}
      </button>
    );
  }
}
export default RetroButton;
