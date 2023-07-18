import React, { useContext } from "react";
import classes from "./FinalText.module.css";
import { LanguageContext } from "../../context/LanguageContext";

const FinalText = () => {
  const { language } = useContext(LanguageContext);
  let isEnglish = language === "en";
  return (
    <section className={classes.FinalText}>
      <div className={classes.wrapper}>
        <div className={classes.FinalTextContent}>
          <div className={classes.FTText}>
            <div className={classes.FTTitle}>
              {isEnglish ? "Stay Connected" : "Залишайся на зв'язку"}
            </div>
            <div className={classes.FTSubTitle}>
              {isEnglish
                ? "Don’t miss out on newly released features, limited-time discounts, and special events. Follow us all social media platforms!"
                : "Не пропустіть нові функції, обмежені за часом знижки, та спеціальні події. Слідкуйте за нами на всіх платформах соціальних мереж!"}
            </div>
          </div>
          <div className={classes.FTImg}>
            <span className={classes.FTSpan1}>&nbsp;</span>
            <span className={classes.FTSpan2}>&nbsp;</span>
            <span className={classes.FTSpan3}>&nbsp;</span>
            <span className={classes.FTSpan4}>&nbsp;</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalText;
