import React, { Component } from "react";
import Modal from "react-modal";
import * as algorithm from "./algorithm";
import "./game-modal.css";

Modal.setAppElement(document.getElementById("root"));

class GameModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalShow: false,
    };
  }

  render = () => {
    return (
      <Modal
        isOpen={this.state.isModalShow}
        onAfterOpen={this.onAfterOpenModal}
        onRequestClose={this.hide}
        className="modal-content"
        overlayClassName="modal-overlay"
        contentLabel="game-modal-dialog"
      >
        <div>
          The winner is: &nbsp;
          <span
            className={algorithm.getWinner() === "X" ? "x-large" : "o-large"}
          >
            {algorithm.getWinner()}
          </span>
        </div>
        <br />

        <button onClick={this.hide}>Close</button>
      </Modal>
    );
  };

  onAfterOpenModal = () => {};

  show = () => {
    this.setState({
      isModalShow: true,
    });
  };

  hide = () => {
    this.setState({
      isModalShow: false,
    });
  };
}

export default GameModal;
