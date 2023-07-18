import React from "react";
import classes from "./FourFigures.module.css";

const FourFigures = () => {
  return (
    <section className={classes.FourFigures}>
      <div className={classes.wrapper}>
        <div className={classes.FiguresContent}>
          <div className={classes.FiguresGroup}>
            <div className={classes.Figure1}>
              <span className={classes.Figure1Span1}>&nbsp;</span>
              <span className={classes.Figure1Span2}>&nbsp;</span>
            </div>
            <div className={classes.Figure2}>
              <span className={classes.Figure2Span1}>&nbsp;</span>
            </div>
          </div>

          <div className={classes.FiguresGroup}>
            <div className={classes.Figure3}>
              <span className={classes.Figure3Span1}>&nbsp;</span>
            </div>
            <div className={classes.Figure4}>
              <span className={classes.Figure4Span1}>&nbsp;</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FourFigures;
