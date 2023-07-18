import React from "react";
import classes from "./Clever.module.css";

const Clever = () => {
  return (
    <section className={classes.Clever}>
      <div className={classes.wrapper}>
        <div className={classes.CleverContent}>
          <div className={classes.CleverFigure}>
            <span className={classes.CleverFigureSpan1}>&nbsp;</span>
            <span className={classes.CleverFigureSpan2}>&nbsp;</span>
            <span className={classes.CleverFigureSpan3}>&nbsp;</span>
            <span className={classes.CleverFigureSpan4}>&nbsp;</span>
            <div className={classes.CleverFigureCenter}>
              <span className={classes.CleverFigureCenter1}>&nbsp;</span>
              <span className={classes.CleverFigureCenter2}>&nbsp;</span>
              <span className={classes.CleverFigureCenter3}>&nbsp;</span>
              <span className={classes.CleverFigureCenter4}>&nbsp;</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Clever;
