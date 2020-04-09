import React, { Children } from 'react';
import Modal from 'react-modal';
import ReactDOM from 'react-dom';
import './index.css';

let boardSize = 20;
let winner = null;
let winArray = new Array(5);

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

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <Board className="caro-board" />
      </div>
    );
  }
}

class Element extends React.Component {
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

class Board extends React.Component {
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
    if (this.state.valueArray[row][col] != null || winner != null) {
      return;
    }
    const newArray = this.state.valueArray.slice();
    newArray[row][col] = this.state.xIsNext ? 'X' : 'O';

    this.state.valueArray = newArray;
    this.state.xIsNext = !this.state.xIsNext;

    if (isWin(newArray, row, col)) {
      for (let i = 0; i < 5; i++) {
        this.state.colorArray[winArray[i].row][winArray[i].col] = "darkkhaki";
      }
      this.state.isModalOpen = true;
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
              color: (winner === 'X') ? "dodgerblue" : "red"
            }}>
              {winner}
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

function isWin(array2D, row, col) {
  let value = array2D[row][col];
  let array;
  let index;

  array = getVerticalArray(array2D, row, col);
  index = getArrayWinFirstElementIndex(array, value);
  if (index !== -1) {
    for (let i = 0; i < 5; i++) {
      winArray[i] = array[index + i];
    }

    winner = value;
    return true;
  }

  array = getHorizontalArray(array2D, row, col);
  index = getArrayWinFirstElementIndex(array, value);
  if (index !== -1) {
    for (let i = 0; i < 5; i++) {
      winArray[i] = array[index + i];
    }

    winner = value;
    return true;
  }

  array = getLeftDiagonalArray(array2D, row, col);
  index = getArrayWinFirstElementIndex(array, value);
  if (index !== -1) {
    for (let i = 0; i < 5; i++) {
      winArray[i] = array[index + i];
    }

    winner = value;
    return true;
  }

  array = getRightDiagonalArray(array2D, row, col);
  index = getArrayWinFirstElementIndex(array, value);
  if (index !== -1) {
    for (let i = 0; i < 5; i++) {
      winArray[i] = array[index + i];
    }

    winner = value;
    return true;
  }

  return false;
}

// 0 1 2 3 <4> 5 6 7 8 
// X X X X X || O O O O O
function getArrayWinFirstElementIndex(array, value) {
  if (array.length >= 5) {
    for (let i = 0; i <= array.length - 5; i++) {
      let count = 0;
      for (let j = i; j < i + 5; j++) {
        if (array[j].val === value) {
          count++;
          if (count === 5) {
            return i;
          }
        } else {
          break;
        }
      }
    }
  }
  return -1;
}

function getVerticalArray(array2D, row, col) { // column
  let array = [];
  for (let i = ((row - 4 > 0) ? (row - 4) : 0); i <= ((row + 4 < boardSize - 1) ? (row + 4) : boardSize - 1); i++) {
    array.push({ val: array2D[i][col], row: i, col: col });
  }
  return array;
}

function getHorizontalArray(array2D, row, col) { // row
  let array = [];
  for (let i = ((col - 4 > 0) ? (col - 4) : 0); i <= ((col + 4 < boardSize - 1) ? (col + 4) : boardSize - 1); i++) {
    array.push({ val: array2D[row][i], row: row, col: i });
  }
  return array;
}

function getLeftDiagonalArray(array2D, row, col) { // topLeft --> bottomRight
  let array = [];
  let startRow;
  let startCol;
  let deltaBackward;
  let nElement;

  for (let i = 4; i >= 0; i--) {
    if (row - i >= 0 && col - i >= 0) {
      deltaBackward = i;
      startRow = row - i;
      startCol = col - i;
      break;
    }
  }

  for (let i = 4; i >= 0; i--) {
    if (row + i <= boardSize - 1 && col + i <= boardSize - 1) {
      nElement = deltaBackward + 1 + i;
      break;
    }
  }

  for (let i = 0; i < nElement; i++) {
    array.push({ val: array2D[startRow + i][startCol + i], row: startRow + i, col: startCol + i });
  }

  return array;
}

function getRightDiagonalArray(array2D, row, col) { // topRight --> bottomLeft
  let array = [];
  let startRow;
  let startCol;
  let deltaBackward;
  let nElement;

  for (let i = 4; i >= 0; i--) {
    if (row - i >= 0 && col + i <= boardSize - 1) {
      deltaBackward = i;
      startRow = row - i;
      startCol = col + i;
      break;
    }
  }

  for (let i = 4; i >= 0; i--) {
    if (row + i <= boardSize - 1 && col - i >= 0) {
      nElement = deltaBackward + 1 + i;
      break;
    }
  }

  for (let i = 0; i < nElement; i++) {
    array.push({ val: array2D[startRow + i][startCol - i], row: startRow + i, col: startCol - i });
  }

  return array;
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);