import React, { useContext } from "react";
import classes from "./Hero.module.css";
import Logo from "../../assets/Settings/LogoGradientGrey.svg";
import ScrollDown from "../../UI/ScrollDown";
import { LanguageContext } from "../../context/LanguageContext";

const Hero = () => {
  const { language } = useContext(LanguageContext);
  let isEnglish = language === "en";
  return (
    <section className={classes.Hero}>
      <ScrollDown black />
      <div className={classes.wrapper}>
        <img src={Logo} alt="" height={600} />
        <div className={classes.HeroContent}>
          <div className={classes.HeroCircles}>
            <span>&nbsp;</span>
            <span>&nbsp;</span>
          </div>
          <div className={classes.HeroTitle}>
            <h1>
              {isEnglish
                ? "Welcome to the Gift Box Revolution!"
                : "Ласкаво просимо до революції подарункових коробок!"}
            </h1>
            <span>{isEnglish ? "Start creating!" : "Почніть творити!"}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
