import React from "react";
import classes from "./Countdown.module.css";
import { Link } from "react-router-dom";

const Countdown = (props) => {
  return (
    <div className={classes.Countdown}>
      <p>
        {props.isEnglish
          ? `You will be redirected to the main page in ${props.countdown} seconds`
          : `Ви будете перенаправлені на головну сторінку через ${props.countdown} секунд(и)`}
      </p>
      <Link to="/">{props.isEnglish ? "Go to main" : "До головної"}</Link>
    </div>
  );
};

export default Countdown;
