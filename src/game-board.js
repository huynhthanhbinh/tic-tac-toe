import React from "react";
import Element from "./element";

import * as algorithm from "./algorithm";

import "./game-board.css";

const boardSize = algorithm.boardSize;

let valueArray;
let colorArray;
let onClickElement;

const GameBoard = (props) => {
  valueArray = props.valueArray;
  colorArray = props.colorArray;
  onClickElement = props.onClickElement;

  return <div className="game-board">{renderBoard()}</div>;
};

const renderBoard = () => {
  const board = [];
  let array2D = new Array(boardSize)
    .fill()
    .map(() => new Array(boardSize).fill(""));

  for (let row = 0; row < boardSize; row++) {
    for (let col = 0; col < boardSize; col++) {
      array2D[row][col] = renderElement(row, col);
    }

    board.push(<div className="board-row">{array2D[row]}</div>);
  }
  return board;
};

const renderElement = (row, col) => {
  return (
    <Element
      value={valueArray[row][col]}
      background={colorArray[row][col]}
      onClick={() => onClickSquare(row, col)}
    />
  );
};

const onClickSquare = (row, col) => {
  if (valueArray[row][col] == null) {
    onClickElement(row, col);
  }
};

export default GameBoard;
