import React from "react";
import classes from "./Ovals.module.css";
import OvalsImg from "../../assets/MainPage/Ovals.svg";
import star from "../../assets/MainPage/Star15.svg";

const Ovals = () => {
  return (
    <section className={classes.Ovals}>
      <div className={classes.wrapper}>
        <div className={classes.OvalsContent}>
          <img className={classes.Oval1} src={OvalsImg} alt="ovalimg" />
          <img className={classes.Oval2} src={star} alt="ovalimg" />
        </div>
      </div>
    </section>
  );
};

export default Ovals;
