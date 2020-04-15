import React from "react";
import "./game-status.css";

const GameStatus = (props) => {
  const xIsNext = props.xIsNext;
  return (
    <div className="game-status">
      <span className={xIsNext ? "x-large" : "o-large"}>{xIsNext ? "X" : "O"}</span>
      <span className="turn-label">&nbsp;turn</span>
    </div>
  );
};

export default GameStatus;
