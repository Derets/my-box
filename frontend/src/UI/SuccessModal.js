import React, { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";
import classes from "./SuccessModal.module.css";

const SuccessModel = (props) => {
  const { language } = useContext(LanguageContext);
  let isEnglish = language === "en";
  return (
    <div className={classes.ModalAuthError}>
      <h1>{isEnglish ? "Success!" : "Все добре!"}</h1>
      <p>{props.text}</p>
      <div className={classes.modalBTN} id="modalBtn" onClick={props.onClick}>
        OK
      </div>
    </div>
  );
};

export default SuccessModel;
