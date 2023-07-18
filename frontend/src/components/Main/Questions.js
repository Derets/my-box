import React, { useContext } from "react";
import classes from "./Questions.module.css";
import { LanguageContext } from "../../context/LanguageContext";

const Questions = () => {
  const { language } = useContext(LanguageContext);
  let isEnglish = language === "en";
  return (
    <section className={classes.Questions}>
      <div className={classes.wrapper}>
        <div className={classes.QuestionsContent}>
          <div className={classes.QuestionsTitle}>
            {isEnglish
              ? "Got Questions? We’ve Got Answers!"
              : "Виникли запитання? У нас є відповіді!"}
          </div>
          <div className={classes.QuestionBlocks}>
            <div className={classes.QuestionBlock}>
              <div className={classes.Question}>
                {isEnglish ? "How does it work?" : "Як це працює?"}
              </div>
              <div className={classes.Answer}>
                {isEnglish
                  ? "Choose your box, use our 3D Constructor to design, and voilà! Your perfect gift box is created."
                  : "Виберіть свою коробку, скористайтеся нашим 3D-конструктором для проектування, і вуаля! Ваша ідеальна подарункова коробка створена."}
              </div>
            </div>
            <div className={classes.QuestionBlock}>
              <div className={classes.Question}>
                {isEnglish ? "What’s the cost?" : "Яка вартість?"}
              </div>
              <div className={classes.Answer}>
                {isEnglish
                  ? "The cost depends on the size of the box - 1 cubic centimeter costs $0.04"
                  : "Вартість залежить від розміру коробки - 1 сантиметр кубічний коштує $0,04"}
              </div>
            </div>
            <div className={classes.QuestionBlock}>
              <div className={classes.Question}>
                {isEnglish ? "Shipping details?" : "Деталі доставки?"}
              </div>
              <div className={classes.Answer}>
                {isEnglish
                  ? "We do not ship worldwide! As this site is for informational purposes only (you can read more on the 'About' page)"
                  : "Ми не відправляємо по всьому світу!Оскільки цей сайт є тільки інформативним (більше можете прочитати на сторінці 'Про нас')"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Questions;
