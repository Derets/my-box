import React, { useContext } from "react";
import classes from "./ScrollDown.module.css";
import { LanguageContext } from "../context/LanguageContext";

const ScrollDown = (props) => {
  const { language } = useContext(LanguageContext);
  let isEnglish = language === "en";

  const clickHandler = () => {
    const windowHeight = window.innerHeight;
    const scrollPosition = window.pageYOffset;

    if (scrollPosition < windowHeight) {
      const scrollTo = Math.min(scrollPosition + windowHeight, windowHeight);
      window.scrollTo({
        top: scrollTo,
        behavior: "smooth",
      });
    }
  };
  return (
    <div className={classes.ScrollButton} onClick={clickHandler}>
      <div
        className={`${classes.ScrollButtonContent} ${
          props.black ? classes.Black : null
        }`}
      >
        <span>&nbsp;</span>
        <p>{isEnglish ? "Scroll" : "Прокрути"}</p>
      </div>
    </div>
  );
};

export default ScrollDown;
