import React, { Component } from "react";
import GameInfo from "./game-info";
import GameStatus from "./game-status";
import GameBoard from "./game-board";
import GameModal from "./game-modal";
import "./game.css";

class Game extends Component {
  constructor(props) {
    super(props);
    this.gameStatus = React.createRef();
    this.gameModal = React.createRef();
  }

  render = () => {
    return (
      <div className="game">
        <GameStatus ref={this.gameStatus} />
        <GameBoard
          onWin={() => this.gameModal.current.show()}
          setIsXNext={(xIsNext) => this.gameStatus.current.setXIsNext(xIsNext)}
        />
        <GameInfo />
        <GameModal ref={this.gameModal} />
      </div>
    );
  };
}

export default Game;
