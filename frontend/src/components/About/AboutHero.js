import React, { useContext } from "react";
import classes from "./AboutHero.module.css";
import ScrollDown from "../../UI/ScrollDown";
import { LanguageContext } from "../../context/LanguageContext";

const AboutHero = () => {
  const { language } = useContext(LanguageContext);
  let isEnglish = language === "en";
  return (
    <section className={classes.AboutHeroSection}>
      <ScrollDown />
      <div className={classes.FigureContent}>
        <div className={classes.Figure}>
          <span className={classes.FigureSpan}>&nbsp;</span>
        </div>
        <h1>
          {isEnglish
            ? "Enter the world of 3D gift box wonders"
            : "Пориньте у світ чудес 3D подарунковох коробок"}
        </h1>
      </div>
    </section>
  );
};

export default AboutHero;
