import React, { Component } from "react";
import "./game-status.css";

class GameStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      xIsNext: true,
      xScore: 0,
      oScore: 0,
    };
  }

  render = () => {
    const xIsNext = this.state.xIsNext;
    return (
      <div className="game-status">
        <span className={xIsNext ? "x-large" : "o-large"}>
          {xIsNext ? "X" : "O"}
        </span>
        <span className="turn-label">&nbsp;turn</span>
      </div>
    );
  };

  setXIsNext = (xIsNext) => {
    this.setState({
      xIsNext: xIsNext,
    });
  };

  increaseXScrore = () => {
    this.setState({
      xScore: this.state.xScore++,
    });
  };

  increaseOScrore = () => {
    this.setState({
      oScore: this.state.oScore++,
    });
  };
}

export default GameStatus;
