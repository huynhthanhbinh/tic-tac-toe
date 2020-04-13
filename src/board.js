import React, { Component } from "react";
import Element from "./element";
import Modal from "react-modal";
import * as algorithm from "./algorithm";
import "./board.css";

const boardSize = algorithm.boardSize;
const winArray = algorithm.winArray;

Modal.setAppElement(document.getElementById("root"));

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      xIsNext: true,
      isModalOpen: false,
      valueArray: Array(boardSize)
        .fill()
        .map((row) => new Array(boardSize).fill(null)),
      colorArray: Array(boardSize)
        .fill()
        .map((row) => new Array(boardSize).fill("black")),
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
    }

    const winner = algorithm.getWinner();

    this.setState({
      valueArray: newValueArray,
      colorArray: newColorArray,
      isModalOpen: winner === null ? false : true,
      xIsNext: winner === null ? !this.state.xIsNext : this.state.xIsNext,
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

  renderModalDialog = () => {
    return (
      <Modal
        isOpen={this.state.isModalOpen}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.closeModal}
        className="modal-content"
        overlayClassName="modal-overlay"
        contentLabel="winner-modal-dialog"
      >
        <div>
          The winner is: &nbsp;
          <span
            style={{
              fontSize: 30,
              fontWeight: "bold",
              color: algorithm.getWinner() === "X" ? "dodgerblue" : "red",
            }}
          >
            {algorithm.getWinner()}
          </span>
        </div>
        <br />

        <button onClick={this.closeModal}>Close</button>
      </Modal>
    );
  };

  renderGameTurn = () => {
    return (
      <div className="game-turn">
        <span
          style={{
            fontSize: 40,
            fontWeight: "bold",
            color: this.state.xIsNext === true ? "dodgerblue" : "red",
          }}
        >
          {this.state.xIsNext === true ? "X" : "O"}
        </span>
        <span
          style={{
            fontSize: 30,
            color: "white",
          }}
        >
          &nbsp;turn
        </span>
      </div>
    );
  };

  afterOpenModal = () => {};

  closeModal = () => {
    this.setState({
      isModalOpen: false,
    });
  };

  render() {
    return (
      <div className={this.props.className}>
        {this.renderGameTurn()}
        {this.renderBoard()}
        {this.renderModalDialog()}
      </div>
    );
  }
}

export default Board;
