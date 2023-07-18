import React, { useContext } from "react";
import classes from "./MiddleText.module.css";
import starImg from "../../assets/MainPage/Star10.svg";
import { Link } from "react-router-dom";
import { LanguageContext } from "../../context/LanguageContext";

const MiddleText = () => {
  const { language } = useContext(LanguageContext);
  let isEnglish = language === "en";
  const scrollToTop = () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  };
  const scrollTo = () => {
    const element = document.getElementById("Gallery");
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: "smooth",
      });
    }
  };
  return (
    <section className={classes.MiddleText}>
      <div className={classes.wrapper}>
        <div className={classes.MiddleTextContent}>
          <div className={classes.MiddleTextImg}>
            <img src={starImg} alt="" />
          </div>
          <div className={classes.MiddleTextTitle}>
            {isEnglish ? "Ready, set, design!" : "На старт, увага, дизайнь!"}
          </div>
          <div className={classes.MiddleTextDescription}>
            {isEnglish
              ? "Choose from a multitude of stunning materials and textures to create your ideal gift box. Begin your gift box masterpiece today!"
              : "Виберіть із безлічі приголомшливих матеріалів і текстур для створення ваша ідеальна подарункова коробка. Почніть створювати шедевр подарункової коробки вже сьогодні!"}
          </div>
          <div className={classes.MiddleTextButtons}>
            <div className={classes.MiddleTextButton1}>
              <Link to={"/constructor"} onClick={scrollToTop}>
                {isEnglish ? "Create now!" : "Створіть зараз!"}
              </Link>
            </div>
            <div className={classes.MiddleTextButton2} onClick={scrollTo}>
              {isEnglish ? "Learn more" : "Дізнатися більше"}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MiddleText;
