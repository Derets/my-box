import React from "react";
import classes from "./RadioButton.module.css";

const RadioButton = (props) => {
  return (
    <div
      className={`${classes.mydict} ${props.isShrink ? classes["shrink"] : ""}`}
    >
      {props.children}
    </div>
  );
};

export default RadioButton;
