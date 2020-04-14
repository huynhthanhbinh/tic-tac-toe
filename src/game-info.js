import React from "react";
import "./game-info.css";

// stateless component is define as constant
// instead of a class which extends React.Component
const GameInfo = () => {
  return (
    <div className="game-info">
      <br />
      <br />
      <hr />
      <p>
        App: Tic-tac-toe (Vietnamese: Caro) - v0.1.0 - written in React/NodeJS - ©2020
        <br />
        Author: Huynh Thanh Binh - Email: 1653006@student.hcmus.edu.vn 
        <br />
        Techniques: react stateful vs. stateless component & react time travel
      </p>
    </div>
  );
};

export default GameInfo;
