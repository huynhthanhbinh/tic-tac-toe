import React from "react";
import Board from "./board";
import "./game.css";

const Game = () => {
  return (
    <div className="game">
      <Board className="caro-board" />
    </div>
  );
};

export default Game;
