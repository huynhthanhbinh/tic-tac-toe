import React, { Component } from "react";
import GameInfo from "./game-info";
import GameStatus from "./game-status";
import GameBoard from "./game-board";
import GameModal from "./game-modal";
import * as algorithm from "./algorithm";
import "./game.css";

let hasWinner = false;
const boardSize = algorithm.boardSize;
const winArray = algorithm.winArray;

class Game extends Component {
  constructor(props) {
    super(props);
    this.gameStatus = React.createRef();
    this.gameModal = React.createRef();

    this.state = {
      stepNumber: 0,
      isHistorySortAsc: true,
      historicValueArray: [emptyValueArray],
      historicColorArray: [emptyColorArray],
    };
  }

  goTo(step) {
    if (!hasWinner) {
      this.setState({
        stepNumber: step,
      });
    }
  }

  render = () => {
    const xIsNext = this.state.stepNumber % 2 === 0;
    return (
      <div className="game">
        <div className="game-main">
          <GameStatus xIsNext={!hasWinner ? xIsNext : !xIsNext} />
          <GameBoard
            onClickElement={(row, col) => this.onClickElement(row, col)}
            valueArray={this.state.historicValueArray[this.state.stepNumber]}
            colorArray={this.state.historicColorArray[hasWinner ? 1 : 0]}
          />
          <GameInfo />
          <GameModal ref={this.gameModal} />
        </div>
        <div className="game-vr"></div>
        <div className="game-sub">
          <button className="btnReverse" onClick={() => this.onClickRevert()}>
            Reverse order
          </button>
          <ol className="stepList">{this.renderStepList()}</ol>
        </div>
      </div>
    );
  };

  onClickRevert = () => {
    this.setState({
      isHistorySortAsc: !this.state.isHistorySortAsc,
    });
  };

  onClickElement = (row, col) => {
    if (!hasWinner) {
      const xIsNext = this.state.stepNumber % 2 === 0;
      const historicValueArray = this.state.historicValueArray.slice(
        0,
        this.state.stepNumber + 1
      );
      const nextValueArray = historicValueArray[
        historicValueArray.length - 1
      ].map((arr) => arr.slice());
      const nextColorArray = this.state.historicColorArray[0].map((arr) =>
        arr.slice()
      );

      nextValueArray[row][col] = xIsNext ? "X" : "O";

      if (algorithm.isWin(nextValueArray, row, col)) {
        hasWinner = true;
        for (let i = 0; i < 5; i++) {
          nextColorArray[winArray[i].row][winArray[i].col] = "darkkhaki";
        }
        this.gameModal.current.show();
      }

      this.setState({
        historicValueArray: historicValueArray.concat([nextValueArray]),
        historicColorArray: hasWinner
          ? this.state.historicColorArray.concat([nextColorArray])
          : this.state.historicColorArray,
        stepNumber: historicValueArray.length,
      });
    }
  };

  renderStepList = () => {
    const stepNumber = this.state.stepNumber;
    const moveList = this.state.historicValueArray.map((valueArray, step) => {
      const buttonLabel = step ? "Go to step #" + step : "Go to game start";
      return (
        <li id={step} key={step}>
          <button
            className={step === stepNumber ? "highlight" : "non-highlight"}
            onClick={() => this.goTo(step)}
          >
            {buttonLabel}
          </button>
        </li>
      );
    });
    return this.state.isHistorySortAsc ? moveList : moveList.reverse();
  };
}

const emptyValueArray = Array(boardSize)
  .fill()
  .map(() => new Array(boardSize).fill(null));

const emptyColorArray = Array(boardSize)
  .fill()
  .map(() => new Array(boardSize).fill("black"));

export default Game;
