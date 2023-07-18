import React, { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";
import classes from "./ErrorModal.module.css";

const ErrorModel = (props) => {
  const { language } = useContext(LanguageContext);
  let isEnglish = language === "en";
  return (
    <div className={classes.ModalAuthError}>
      <h1>{isEnglish ? "An error occurred!" : "Упс... Відбулася помилка!"}</h1>
      <p>{props.error}</p>
      <div className={classes.modalBTN} id="modalBtn" onClick={props.onClick}>
        OK
      </div>
    </div>
  );
};

export default ErrorModel;
