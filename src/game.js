import React, { Component } from 'react';
import Board from './board';
import './game.css';

class Game extends Component {
  render() {
    return (
      <div className="game">
        <Board className="caro-board" />
      </div>
    );
  }
}

export default Game;