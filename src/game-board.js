import React, { Component } from "react";
import Element from "./element";

import * as gameTurn from "./game-status";
import * as algorithm from "./algorithm";

import "./game-board.css";

const boardSize = algorithm.boardSize;
const winArray = algorithm.winArray;

class GameBoard extends Component {
  constructor(props) {
    super(props);
    this.onWin = this.props.onWin;
    this.setIsXNext = this.props.setIsXNext;

    this.state = {
      xIsNext: true,
      valueArray: Array(boardSize)
        .fill()
        .map(() => new Array(boardSize).fill(null)),
      colorArray: Array(boardSize)
        .fill()
        .map(() => new Array(boardSize).fill("black")),
    };
  }

  onClickElement = (row, col) => {
    if (
      this.state.valueArray[row][col] != null ||
      algorithm.getWinner() != null
    ) {
      return;
    }

    const newValueArray = this.state.valueArray;
    const newColorArray = this.state.colorArray;
    newValueArray[row][col] = this.state.xIsNext ? "X" : "O";

    if (algorithm.isWin(newValueArray, row, col)) {
      for (let i = 0; i < 5; i++) {
        newColorArray[winArray[i].row][winArray[i].col] = "darkkhaki";
      }
      this.onWin();
    }

    const newXIsNext =
      algorithm.getWinner() === null ? !this.state.xIsNext : this.state.xIsNext;

    this.setIsXNext(newXIsNext);

    this.setState({
      valueArray: newValueArray,
      colorArray: newColorArray,
      xIsNext: newXIsNext,
    });
  };

  renderElement = (row, col) => {
    return (
      <Element
        value={this.state.valueArray[row][col]}
        onClick={() => this.onClickElement(row, col)}
        background={this.state.colorArray[row][col]}
      />
    );
  };

  renderBoard = () => {
    const board = [];
    let array2D = new Array(boardSize)
      .fill(null)
      .map((row) => new Array(boardSize).fill(""));

    for (let row = 0; row < boardSize; row++) {
      for (let col = 0; col < boardSize; col++) {
        array2D[row][col] = this.renderElement(row, col);
      }

      board.push(<div className="board-row">{array2D[row]}</div>);
    }
    return board;
  };

  render() {
    return (
      <div className="game-board">
        {this.renderBoard()}
      </div>
    );
  }
}

export default GameBoard;
