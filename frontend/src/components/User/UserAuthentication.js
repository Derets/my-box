import React, { useContext, useState } from "react";
import classes from "./UserAuthentication.module.css";
import { AuthContext } from "../../context/AuthContext";
import Loader from "../../UI/Loader";
import Modal from "../../UI/Modal";
import { LanguageContext } from "../../context/LanguageContext";
import ErrorModel from "../../UI/ErrorModal";
import SuccessModel from "../../UI/SuccessModal";
import CentralModal from "../../UI/CentralModal";
import PasswordReset from "../../UI/PasswordReset";
import ReconfirmEmail from "../../UI/ReconfirmEmail";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const UserAuthentication = () => {
  const { login, isLoggedIn } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isReseting, setIsReseting] = useState(false);
  const [isReconfirmation, setIsReconfirmation] = useState(false);

  const { language } = useContext(LanguageContext);
  let isEnglish = language === "en";

  const navigate = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(`${process.env.REACT_APP_API_URL}login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: e.target.loginEmailInput.value,
          password: e.target.loginPasswordInput.value,
        }),
      });

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }
      if (responseData.userId) {
        localStorage.setItem("user_id", responseData.userId);
      } else {
        throw new Error("There is no userId");
      }
      setIsLoading(false);
      login(responseData.userId, responseData.token, responseData.role);
      navigate("/profile");
    } catch (err) {
      console.log(err);
      setError(err.message || "Something went wrong, please try again  ");
      setIsLoading(false);
    }
  };

  const signupHandler = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      setError(null);
      setIsSuccess(false);
      const response = await fetch(`${process.env.REACT_APP_API_URL}signup`, {
        method: "POST",
        body: JSON.stringify({
          name: e.target.signupUsername.value,
          email: e.target.signupEmail.value,
          password: e.target.signupPassword.value,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

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

  const GoogleSignupHandler = async (userObject) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}google/signup`,
        {
          method: "POST",
          body: JSON.stringify({
            name: userObject.name,
            email: userObject.email,
            image: userObject.picture,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }
      if (responseData.userId) {
        localStorage.setItem("user_id", responseData.userId);
      } else {
        throw new Error("There is no userId");
      }
      login(responseData.userId, responseData.token);
      setIsLoading(false);
      navigate("/profile");
    } catch (err) {
      console.log(err);
      setError(err.message || "Something went wrong, please try again  ");
      setIsLoading(false);
    }
  };
  const GoogleLoginHandler = async (userObject) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}google/login`,
        {
          method: "POST",
          body: JSON.stringify({
            email: userObject.email,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }
      if (responseData.userId) {
        localStorage.setItem("user_id", responseData.userId);
      } else {
        throw new Error("There is no userId");
      }
      login(responseData.userId, responseData.token, responseData.role);
      setIsLoading(false);
      navigate("/profile");
    } catch (err) {
      console.log(err);
      setError(err.message || "Something went wrong, please try again  ");
      setIsLoading(false);
    }
  };

  return (
    <>
      {isReseting && (
        <CentralModal
          onClick={() => {
            setIsReseting(false);
          }}
        >
          <PasswordReset
            onExit={() => {
              setIsReseting(false);
            }}
          />
        </CentralModal>
      )}
      {isReconfirmation && (
        <CentralModal
          onClick={() => {
            setIsReconfirmation(false);
          }}
        >
          <ReconfirmEmail
            onExit={() => {
              setIsReconfirmation(false);
            }}
          />
        </CentralModal>
      )}
      {isSuccess && (
        <Modal
          onClick={() => {
            setIsSuccess(false);
          }}
        >
          <SuccessModel
            text={`${
              isEnglish
                ? "A confirmation link has been sent to your email, be sure to check your spam!"
                : "Посилання для підтвердження надіслано на вашу електронну пошту, обов’язково перевірте спам!"
            }`}
            onClick={() => {
              setIsSuccess(false);
            }}
          />
        </Modal>
      )}
      {error && (
        <Modal
          onClick={() => {
            setError(null);
          }}
        >
          <ErrorModel
            error={error}
            onClick={() => {
              setError(null);
            }}
          />
        </Modal>
      )}
      <div className={classes.AuthenticationSection}>
        <div className={classes.container}>
          <div className={`${classes.row} ${classes.fullHeight}`}>
            <div
              className={`${classes.col} ${classes["text-center"]} ${classes["align-self-center"]} ${classes.py}`}
            >
              <div
                className={`${classes.section} ${classes.pb} ${classes.pt} ${classes["pt-sm-2"]} ${classes["text-center"]}`}
              >
                <h6 className={`${classes.mb} ${classes.pb}`}>
                  <span>{isEnglish ? "Log In" : "Вхід"}</span>
                  <span>{isEnglish ? "Sign Up" : "Зареєстрація"}</span>
                </h6>
                <input
                  className={classes.checkbox}
                  type="checkbox"
                  id="reg-log"
                  name="reg-log"
                />
                <label htmlFor="reg-log"></label>
                <div className={classes["card-3d-wrap"]}>
                  <div className={classes["card-3d-wrapper"]}>
                    <div className={classes["card-front"]}>
                      <div className={classes["center-wrap"]}>
                        <form
                          onSubmit={loginHandler}
                          className={`${classes.section} ${classes["text-center"]}`}
                        >
                          <h4 className={`${classes.mb} ${classes.pb}`}>
                            {isEnglish ? "Log In" : "Вхід"}
                          </h4>
                          <div className={classes["form-group"]}>
                            <input
                              id="loginEmailInput"
                              type="email"
                              className={classes["form-style"]}
                              placeholder={isEnglish ? "Email" : "Пошта"}
                            />
                            <i
                              className={`${classes["input-icon"]} ${classes.uil} ${classes["uil-at"]}`}
                            ></i>
                          </div>
                          <div
                            className={`${classes["form-group"]} ${classes.mt2}`}
                          >
                            <input
                              id="loginPasswordInput"
                              type="password"
                              className={classes["form-style"]}
                              placeholder={isEnglish ? "Password" : "Пароль"}
                            />
                            <i
                              className={`${classes["input-icon"]} ${classes.uil} ${classes["uil-lock-alt"]}`}
                            ></i>
                          </div>
                          <button
                            type="submit"
                            className={`${classes.btn} ${
                              !isLoading && !error && isLoggedIn
                                ? classes.Success
                                : null
                            }`}
                            disabled={!isLoading && !error && isLoggedIn}
                          >
                            {isLoading && <Loader />}
                            {!isLoading &&
                              !error &&
                              !isLoggedIn &&
                              isEnglish &&
                              "Login"}
                            {!isLoading &&
                              !error &&
                              !isLoggedIn &&
                              !isEnglish &&
                              "Увійти"}
                            {!isLoading &&
                              !error &&
                              isLoggedIn &&
                              isEnglish &&
                              "Already logged in"}
                            {!isLoading &&
                              !error &&
                              isLoggedIn &&
                              !isEnglish &&
                              "Ви вже увійшли"}
                            {error && isEnglish && "Try again"}
                            {error && !isEnglish && "Спробуйте знову"}
                          </button>
                          <p
                            className={`${classes.mb} ${classes.mt4} ${classes["text-center"]}`}
                          >
                            <div className={classes.GoogleLoginIcon}>
                              <GoogleLogin
                                // type={"icon"}
                                className={classes.GoogleLoginIcon}
                                theme={"filled_blue"}
                                size="large"
                                text="signup_with"
                                onSuccess={(credentialResponse) => {
                                  GoogleLoginHandler(
                                    jwt_decode(credentialResponse.credential)
                                  );
                                  console.log(
                                    jwt_decode(credentialResponse.credential)
                                  );
                                }}
                                onError={() => {
                                  console.log("Login Failed");
                                }}
                              />
                            </div>
                            <button
                              className={classes.link}
                              type="button"
                              onClick={() => {
                                setIsReseting(true);
                              }}
                            >
                              {isEnglish
                                ? "Forgot your password?"
                                : "Забули пароль?"}
                            </button>
                          </p>
                          <p>
                            <button
                              className={classes.link}
                              type="button"
                              onClick={() => {
                                setIsReconfirmation(true);
                              }}
                            >
                              {isEnglish
                                ? "Reconfirm email"
                                : "Перепідтвердити пошту"}
                            </button>
                          </p>
                        </form>
                      </div>
                    </div>

                    {/* BACKCARD */}
                    <div className={classes["card-back"]}>
                      <div className={classes["center-wrap"]}>
                        <form
                          onSubmit={signupHandler}
                          className={`${classes.section} ${classes["text-center"]}`}
                        >
                          <h4 className={`${classes.mb3} ${classes.pb3}`}>
                            {isEnglish ? "Sign Up" : "Зареєстрація"}
                          </h4>
                          <div className={classes["form-group"]}>
                            <input
                              id="signupUsername"
                              type="text"
                              className={classes["form-style"]}
                              placeholder={
                                isEnglish ? "Full Name" : "Повне ім`я"
                              }
                            />
                            <i
                              className={`${classes["input-icon"]} ${classes.uil} ${classes["uil-user"]}`}
                            ></i>
                          </div>
                          <div
                            className={`${classes["form-group"]} ${classes.mt2}`}
                          >
                            <input
                              id="signupEmail"
                              type="email"
                              className={classes["form-style"]}
                              placeholder={isEnglish ? "Email" : "Пошта"}
                            />
                            <i
                              className={`${classes["input-icon"]} ${classes.uil} ${classes["uil-at"]}`}
                            ></i>
                          </div>
                          <div
                            className={`${classes["form-group"]} ${classes.mt2}`}
                          >
                            <input
                              id="signupPassword"
                              type="password"
                              className={classes["form-style"]}
                              placeholder={isEnglish ? "Password" : "Пароль"}
                            />
                            <i
                              className={`${classes["input-icon"]} ${classes.uil} ${classes["uil-lock-alt"]}`}
                            ></i>
                          </div>
                          <button
                            type="submit"
                            className={classes.btn}
                            disabled={!isLoading && !error && isLoggedIn}
                          >
                            {isLoading && <Loader />}
                            {!isLoading &&
                              !error &&
                              !isLoggedIn &&
                              isEnglish &&
                              "Register"}
                            {!isLoading &&
                              !error &&
                              !isLoggedIn &&
                              !isEnglish &&
                              "Зареєструватися"}
                            {!isLoading &&
                              !error &&
                              isLoggedIn &&
                              isEnglish &&
                              "Already logged in"}
                            {!isLoading &&
                              !error &&
                              isLoggedIn &&
                              !isEnglish &&
                              "Ви вже увійшли"}
                            {error && isEnglish && "Try again"}
                            {error && !isEnglish && "Спробуйте знову"}
                          </button>
                          <div className={classes.GoogleLoginIcon}>
                            <GoogleLogin
                              theme={"filled_blue"}
                              size="large"
                              text="signup_with"
                              onSuccess={(credentialResponse) => {
                                GoogleSignupHandler(
                                  jwt_decode(credentialResponse.credential)
                                );
                                console.log(
                                  jwt_decode(credentialResponse.credential)
                                );
                              }}
                              onError={() => {
                                console.log("Login Failed");
                              }}
                            />
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserAuthentication;
