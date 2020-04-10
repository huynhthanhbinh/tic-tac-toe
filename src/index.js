import React, { Component } from 'react';
import Modal from 'react-modal';
import ReactDOM from 'react-dom';
import * as algorithm from './algorithm';
import './index.css';

const boardSize = algorithm.boardSize;
const winArray = algorithm.winArray;

const customStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.75)'
  },
  content: {
    top: '10%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    backgroundColor: 'silver'
  }
};

Modal.setAppElement(document.getElementById('root'));

class Game extends Component {
  render() {
    return (
      <div className="game">
        <Board className="caro-board" />
      </div>
    );
  }
}

class Element extends Component {
  render() {
    return (
      <button className="square"
        onClick={() => { this.props.onClick() }}
        style={{
          float: 'center',
          color: this.props.value === 'X' ? 'dodgerblue' : 'red',
          backgroundColor: this.props.thaydoimau
        }}>

        {this.props.value}

      </button>
    );
  }
}

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      xIsNext: true,
      isModalOpen: false,
      valueArray: Array(boardSize)
        .fill()
        .map(row => new Array(boardSize)
          .fill(null)),
      colorArray: Array(boardSize)
        .fill()
        .map(row => new Array(boardSize)
          .fill("black")),
    };
  }

  onClickElement(row, col) {
    if (this.state.valueArray[row][col] != null || algorithm.getWinner() != null) {
      return;
    }
    const newArray = this.state.valueArray.slice();
    newArray[row][col] = this.state.xIsNext ? 'X' : 'O';



    if (algorithm.isWin(newArray, row, col)) {
      for (let i = 0; i < 5; i++) {
        this.state.colorArray[winArray[i].row][winArray[i].col] = "darkkhaki";
      }
      this.state.isModalOpen = true;
    }

    this.state.valueArray = newArray;

    if (algorithm.getWinner() === null) {
      this.state.xIsNext = !this.state.xIsNext;
    }
    
    this.setState(this.state);
  }

  renderElement = (row, col) => {
    return (
      <Element
        value={this.state.valueArray[row][col]}
        onClick={() => this.onClickElement(row, col)}
        thaydoimau={this.state.colorArray[row][col]}
      />
    );
  }

  renderBoard = () => {
    const board = [];
    let array2D = new Array(boardSize)
      .fill(null)
      .map(row => new Array(boardSize).fill(""));

    for (let row = 0; row < boardSize; row++) {
      for (let col = 0; col < boardSize; col++) {
        array2D[row][col] = this.renderElement(row, col);
      }

      board.push(
        <div className="board-row">
          {array2D[row]}
        </div>
      )
    }
    return board;
  }

  afterOpenModal = () => {

  }

  closeModal = () => {
    this.setState({
      isModalOpen: false,
    })
  }

  render() {
    return (
      <div className={this.props.className}>
        <div className="game-turn">
          <span style={{
            fontSize: 40,
            fontWeight: "bold",
            color: (this.state.xIsNext === true) ? "dodgerblue" : "red"
          }}>
            {(this.state.xIsNext === true) ? "X" : "O"}
          </span>
          <span style={{
            fontSize: 30,
            color: "white"
          }}>
            &nbsp;turn
          </span>
        </div>

        <br />
        {this.renderBoard()}

        <Modal
          isOpen={this.state.isModalOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="winner-modal-dialog">

          <div>
            The winner is: &nbsp;
            <span style={{
              fontSize: 30,
              fontWeight: "bold",
              color: (algorithm.getWinner() === 'X') ? "dodgerblue" : "red"
            }}>
              {algorithm.getWinner()}
            </span>
          </div>
          <br />

          <button onClick={this.closeModal}>
            Close
          </button>
        </Modal>
      </div>
    );
  }
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);