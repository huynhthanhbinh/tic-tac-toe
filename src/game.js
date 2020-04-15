import React, { Component } from "react";
import GameInfo from "./game-info";
import GameStatus from "./game-status";
import GameBoard from "./game-board";
import GameModal from "./game-modal";
import * as algorithm from "./algorithm";
import "./game.css";

const boardSize = algorithm.boardSize;

class Game extends Component {
  constructor(props) {
    super(props);
    this.gameStatus = React.createRef();
    this.gameModal = React.createRef();

    this.state = {
      stepNumber: 0,
      isHistorySortAsc: true,
      historicWinArray: [false],
      historicValueArray: [emptyValueArray],
      historicColorArray: [emptyColorArray],
    };
  }

  goTo(step) {
    this.setState({
      stepNumber: step,
    });
  }

  render = () => {
    const isWinStep = this.state.historicWinArray[this.state.stepNumber];

    return (
      <div className="game">
        <div className="game-main">
          <GameStatus xIsNext={this.state.stepNumber % 2 === 0} />
          <GameBoard
            onClickElement={(row, col) => this.onClickElement(row, col)}
            valueArray={this.state.historicValueArray[this.state.stepNumber]}
            colorArray={this.state.historicColorArray[isWinStep ? 1 : 0]}
          />
          <GameInfo />
          <GameModal ref={this.gameModal} />
        </div>
        <div className="game-vr"></div>
        <div className="game-sub">
          <ol>{this.renderMoveList()}</ol>
        </div>
      </div>
    );
  };

  onClickElement = (row, col) => {
    const xIsNext = this.state.stepNumber % 2 === 0;
    const historicValueArray = this.state.historicValueArray.slice(0, this.state.stepNumber + 1);
    const nextValueArray = historicValueArray[historicValueArray.length - 1].map((arr) => arr.slice());

    nextValueArray[row][col] = xIsNext ? "X" : "O";

    const isWin = false;

    this.setState({
      historicWinArray: this.state.historicWinArray.concat(isWin),
      historicValueArray: historicValueArray.concat([nextValueArray]),
      stepNumber: historicValueArray.length,
    });
  };

  renderMoveList = () => {
    const stepNumber = this.state.stepNumber;
    return this.state.historicValueArray.map((valueArray, step) => {
      const buttonLabel = step ? "Go to step #" + step : "Go to game start";
      return (
        <li id={step} key={step}>
          <button className={step === stepNumber ? "highlight" : "non-highlight"} onClick={() => this.goTo(step)}>
            {buttonLabel}
          </button>
        </li>
      );
    });
  };
}

const emptyValueArray = Array(boardSize)
  .fill()
  .map(() => new Array(boardSize).fill(null));

const emptyColorArray = Array(boardSize)
  .fill()
  .map(() => new Array(boardSize).fill("black"));

export default Game;
