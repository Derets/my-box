import React from "react";
import classes from "./Loader.module.css";

const Loader = (props) => {
  return (
    <div
      className={`${classes.newtonsCradle} ${
        props.light ? classes.light : null
      }`}
    >
      <div className={classes.newtonsCradle__dot}></div>
      <div className={classes.newtonsCradle__dot}></div>
      <div className={classes.newtonsCradle__dot}></div>
      <div className={classes.newtonsCradle__dot}></div>
    </div>
  );
};

export default Loader;
