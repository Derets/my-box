import React, { useContext } from "react";
import classes from "./AboutDescription.module.css";
import { LanguageContext } from "../../context/LanguageContext";

const AboutDescription = () => {
  const { language } = useContext(LanguageContext);
  let isEnglish = language === "en";
  return (
    <section className={classes.AboutDescriptionSection}>
      <div className={classes.wrapper}>
        <div className={classes.AboutDescriptionContent}>
          <h4>
            {isEnglish ? "About this site" : "Про цей сайт"}
            <img src="" />
          </h4>
          <p>
            {isEnglish
              ? "In order to fully understand the goals and the creator of this website, clear and comprehensive information is provided here, leaving no questions unanswered."
              : "Для повного розуміння цілей і створювача даного веб-сайту тут надається ясна та всестороння інформація, яка не залишає жодних питань без відповіді."}
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutDescription;
