import React, { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";
import classes from "./ConfirmModel.module.css";

const ConfirmModal = (props) => {
  const { language } = useContext(LanguageContext);
  let isEnglish = language === "en";
  return (
    <div className={classes.ModalAuthError}>
      <h1>{isEnglish ? props.textEnglish : props.textUkranian}</h1>
      <div className={classes.modalButtons}>
        <div
          className={classes.modalBTNUnconfirm}
          id="modalBtn"
          onClick={props.onUnconfirm}
        >
          {isEnglish ? "No, i don`t!" : "Ні, не хочу!"}
        </div>
        <div
          className={classes.modalBTNConfirm}
          id="modalBtn"
          onClick={props.onConfirm}
        >
          {isEnglish ? "Yeap" : "Так"}
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
