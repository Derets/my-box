import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../UI/Modal";
import SuccessModel from "../UI/SuccessModal";
import ErrorModel from "../UI/ErrorModal";
import { Loader } from "@react-three/drei";
import { AuthContext } from "../context/AuthContext";
import { LanguageContext } from "../context/LanguageContext";
import Countdown from "../UI/CountDown";

const EmailConfirmation = () => {
  const { token } = useParams();
  const { login } = useContext(AuthContext);
  const { language } = useContext(LanguageContext);
  let isEnglish = language === "en";

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const navigate = useNavigate();

  let interval;
  const redirectCountdown = () => {
    interval = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);
  };
  useEffect(() => {
    if (countdown <= 0) {
      clearInterval(interval);
      navigate("/");
    }
  }, [countdown]);

  const fetchData = async (token) => {
    try {
      setIsLoading(true);
      setError(null);
      setIsSuccess(false);
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}emailconfirmation/${token}`,
        {
          method: "POST",
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
      setIsSuccess(true);
      redirectCountdown();
    } catch (err) {
      console.log(err);
      setError(err.message || "Something went wrong, please try again  ");
      setIsLoading(false);
      setIsSuccess(false);
      redirectCountdown();
    }
  };

  useEffect(() => {
    fetchData(token);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <>
      {isSuccess && (
        <Modal
          onClick={() => {
            setIsSuccess(false);
          }}
        >
          <SuccessModel
            text={"Your email has been verified!"}
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
      {isLoading && <Loader />}
      <Countdown isEnglish={isEnglish} countdown={countdown} />
    </>
  );
};

export default EmailConfirmation;
