import React, { useContext } from "react";
import classes from "./TopText.module.css";
import { LanguageContext } from "../../context/LanguageContext";

const TopText = () => {
  const { language } = useContext(LanguageContext);
  let isEnglish = language === "en";
  return (
    <section className={classes.TopText}>
      <div className={classes.wrapper}>
        <div className={classes.TopTextContent}>
          <div className={classes.TopTextTitle}>
            {isEnglish
              ? "Unleash Your Creativity"
              : "Дайте волю своїй творчості"}
          </div>
          <div className={classes.TopTextText}>
            {isEnglish
              ? "Ever struggled to find the perfect gift box for that special someone? Stress no more! Our 3D model constructor makes designing one-of-a-kind boxes a breeze."
              : "Ви коли-небудь намагалися знайти ідеальну подарункову коробку для особливої ​​людини? Більше ніякого стресу! Наш конструктор 3D моделі робить проектування єдині в своєму роді коробки."}
          </div>
          <div className={classes.TopTextStats}>
            <div className={classes.TopTextStatsElement}>
              <span>267</span>
              <h4>{isEnglish ? "Unique Designs" : "Унікальних дизайнів"}</h4>
            </div>
            <div className={classes.TopTextStatsElement}>
              <span>349</span>
              <h4>{isEnglish ? "Happy Customers" : "Щасливих клієнтів"}</h4>
            </div>
            <div className={classes.TopTextStatsElement}>
              <span>114</span>
              <h4>{isEnglish ? "5-star Reviews" : "5-зіркових відгуків"}</h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopText;
