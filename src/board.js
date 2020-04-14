import React, { Component } from "react";
import Element from "./element";
import GameInfo from "./game-info";
import GameTurn from "./game-turn";
import GameModal from "./game-modal";

import * as gameTurn from "./game-turn";
import * as algorithm from "./algorithm";

const boardSize = algorithm.boardSize;
const winArray = algorithm.winArray;

class Board extends Component {
  constructor(props) {
    super(props);
    this.gameModal = React.createRef();

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
      this.gameModal.current.show();
    }

    const newXIsNext =
      algorithm.getWinner() === null ? !this.state.xIsNext : this.state.xIsNext;

    gameTurn.setIsXNext(newXIsNext);

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

    board.push(<br />);
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
      <div className={this.props.className}>
        <GameTurn />
        {this.renderBoard()}
        <GameInfo />
        <GameModal ref={this.gameModal} />
      </div>
    );
  }
}

export default Board;
