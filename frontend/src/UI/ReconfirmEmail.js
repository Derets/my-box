import React, { useContext, useState } from "react";
import { LanguageContext } from "../context/LanguageContext";
import classes from "./PasswordReset.module.css";
import Loader from "./Loader";

const ReconfirmEmail = (props) => {
  const [email, setEmail] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const { language } = useContext(LanguageContext);
  let isEnglish = language === "en";

  const resetHandler = async (email) => {
    try {
      setIsLoading(true);
      setError(null);
      setIsSuccess(false);
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}reconfirmemail`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
          }),
        }
      );

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }
      setIsLoading(false);
      setIsSuccess(true);
    } catch (err) {
      console.log(err);
      setError(err.message || "Something went wrong, please try again  ");
      setIsLoading(false);
      setIsSuccess(false);
    }
  };

  return (
    <div className={classes.ModalAuthError}>
      <h1>{isEnglish ? "Enter email: " : "Введіть пошту: "}</h1>

      <input
        className={classes.EmailInput}
        type="text"
        id="email"
        required
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      {isLoading && <Loader />}
      {error && <p>{error}</p>}
      {isSuccess && (
        <p>
          {isEnglish
            ? "Mail sent successfully, please check your email address."
            : "Письмо відіслано на пошту, будь ласка переглятне е-мейл."}
        </p>
      )}
      <div className={classes.modalButtons}>
        <div
          className={classes.modalBTNUnconfirm}
          id="modalBtn"
          onClick={props.onExit}
        >
          {isEnglish ? "Not now" : "Не зараз"}
        </div>
        <div
          className={classes.modalBTNConfirm}
          id="modalBtn"
          onClick={() => {
            resetHandler(email);
          }}
        >
          {isEnglish ? "Send" : "Відправити"}
        </div>
      </div>
    </div>
  );
};

export default ReconfirmEmail;
