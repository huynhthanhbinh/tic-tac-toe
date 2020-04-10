import React, { Component } from "react";
import "./element.css";

class Element extends Component {
  renderSquare = () => {
    return (
      <button
        className="square"
        onClick={() => {
          this.props.onClick();
        }}
        style={{
          float: "center",
          color: this.props.value === "X" ? "dodgerblue" : "red",
          backgroundColor: this.props.background,
        }}
      >
        {this.props.value}
      </button>
    );
  };

  render() {
    return this.renderSquare();
  }
}

export default Element;