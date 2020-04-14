import React from "react";
import "./element.css";

// stateless component is define as constant
// instead of a class which extends React.Component
const Element = (props) => {
  return (
    <button
      className="square"
      onClick={props.onClick}
      style={{
        color: props.value === "X" ? "dodgerblue" : "red",
        backgroundColor: props.background,
      }}
    >
      {props.value}
    </button>
  );
};

export default Element;
