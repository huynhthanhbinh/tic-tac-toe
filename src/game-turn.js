import React from "react";
import "./game-turn.css";

let isXNext = true;
let xScore = 0;
let oScore = 0;

export const setIsXNext = (xIsNext) => {
  isXNext = xIsNext;
};

export const increaseXScrore = () => {
  xScore++;
};

export const increaseOScrore = () => {
  oScore++;
};

const GameTurn = () => {
  return (
    <div className="game-turn">
      <span className={isXNext ? "x-large" : "o-large"}>{isXNext ? "X" : "O"}</span>
      <span className="turn-label">&nbsp;turn</span>
    </div>
  );
};

export default GameTurn;
