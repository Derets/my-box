import React, { useContext, useEffect, useState } from "react";
import classes from "./OrderForm.module.css";
import { AuthContext } from "../../context/AuthContext";
import Loader from "../../UI/Loader";
import { useForm } from "react-hook-form";
import { LanguageContext } from "../../context/LanguageContext";

const OrderForm = (props) => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
    setValue,
  } = useForm({ mode: "onBlur" });

  const [userId, setUserId] = useState(`${process.env.REACT_APP_MAIN_ID}`);

  const { isLoggedIn, token } = useContext(AuthContext);
  const { language } = useContext(LanguageContext);
  let isEnglish = language === "en";

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [errorFetch, setErrorFetch] = useState(null);

  const fetchData = async () => {
    setIsFetching(true);
    if (isLoggedIn) {
      setUserId(localStorage.getItem("user_id"));
      let userId = localStorage.getItem("user_id");
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}${userId}`,
          {
            method: "GET",
            headers: {
              authorization: "Bearer " + token,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Request failed");
        }
        const data = await response.json();
        setValue("name", data.user.name);
        setValue("email", data.user.email);
        setValue("number", data.user.number);
        setValue("city", data.user.city);
        setValue("post", data.user.post);
        setIsFetching(false);
      } catch (error) {
        console.error(error);
        setErrorFetch(
          error.message || "Something went wrong, please try again  "
        );
        setIsFetching(false);
      }
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchData();
    }
  }, []);

  const makeOrder = async (data) => {
    const request = {
      typeOfBox: props.boxType || "CubeBox",
      size: { length: props.length, width: props.width, height: props.height },
      colors: {
        colorOne: props.colorOne,
        colorTwo: props.colorTwo,
        colorThree: props.colorThree,
      },
      address: {
        email: data.email,
        telNumber: data.number,
        city: data.city,
        postDepartment: data.post,
      },
      creator: userId,
      name: data.name,
      amount: props.amount,
      price: props.price,
      comment: data.comment,
    };
    try {
      setIsLoading(true);
      setIsSuccess(null);
      const response = await fetch(`${process.env.REACT_APP_API_URL}ordering`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(request),
      });
      if (!response.ok) {
        throw new Error("Request failed");
      }
      const responseData = await response.json();
      reset();
      setIsLoading(false);
      setIsSuccess(true);
    } catch (error) {
      console.error(error);
      setError(error.message || "Something went wrong, please try again  ");
      setIsLoading(false);
      setIsSuccess(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(makeOrder)} className={classes.OrderForm}>
        <div className={classes.wrapper}>
          {isFetching && isLoggedIn && (
            <>
              <Loader />
              <div className={classes.loadingInfo}>
                {isEnglish
                  ? "Loading data from your profile..."
                  : "Завантаження інформації з вашого профілю..."}
              </div>
            </>
          )}
          {!isFetching && !errorFetch && isLoggedIn && (
            <div className={classes.loadingInfo}>
              {isEnglish
                ? "Data from your profile was fetched successfully"
                : "Дані з вашого профілю були завантажені успішно"}
            </div>
          )}
          {!isFetching && errorFetch && isLoggedIn && (
            <div className={classes.loadingInfo}>
              {isEnglish
                ? `The autofill information from your profile was not loaded (Reason: ${errorFetch})`
                : `Інформація для автозаповнення з вашого профілю не була завантажена (Причина: ${errorFetch})`}
            </div>
          )}
          <div className={classes.FormBlocks}>
            <div className={classes.FormBlock}>
              <h2>Contact Information</h2>
              <label className={`${errors?.name ? classes.Error : null}`}>
                {isEnglish ? "Name" : "Ім`я"}
                <br />
                <input
                  placeholder={
                    isEnglish ? "Enter you name" : "Введіть ваше ім`я"
                  }
                  type="text"
                  {...register("name", {
                    required: `${
                      isEnglish
                        ? "This field must not be empty!"
                        : "Це поле не повинно бути порожнім!"
                    }`,
                    minLength: {
                      value: 1,
                    },
                  })}
                />
                <div className={classes.errorMessage}>
                  {errors?.name && (
                    <p>
                      {errors?.name?.message ||
                        `${isEnglish ? "Error" : "Помилка"}`}
                    </p>
                  )}
                </div>
              </label>

              <label className={`${errors?.email ? classes.Error : null}`}>
                Email
                <br />
                <input
                  placeholder={isEnglish ? "Enter email" : "Введіть email"}
                  type="email"
                  {...register("email", {
                    required: `${
                      isEnglish
                        ? "Enter valid email!"
                        : "Введіть коректний email!"
                    }`,
                    pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                  })}
                />
                <div className={classes.errorMessage}>
                  {errors?.email && (
                    <p>
                      {errors?.email?.message ||
                        `${isEnglish ? "Error" : "Помилка"}`}
                    </p>
                  )}
                </div>
              </label>

              <label className={`${errors?.number ? classes.Error : null}`}>
                {isEnglish ? "Number" : "Номер"}
                <br />
                <input
                  placeholder={
                    isEnglish ? "Enter phone number" : "Введіть номер телефону"
                  }
                  type="text"
                  {...register("number", {
                    required: `${
                      isEnglish
                        ? "Enter valid phone number!"
                        : "Введіть коректний номер телефону!"
                    }`,
                    pattern: /^\+(?:[0-9] ?){6,14}[0-9]$/,
                  })}
                />
                <div className={classes.errorMessage}>
                  {errors?.number && (
                    <p>
                      {errors?.number?.message ||
                        `${isEnglish ? "Error" : "Помилка"}`}
                    </p>
                  )}
                </div>
              </label>
            </div>
            <div className={classes.FormBlock}>
              <h2>{isEnglish ? "Postal Details" : "Поштові дані"}</h2>
              <label className={`${errors?.post ? classes.Error : null}`}>
                {isEnglish ? "Post Department" : "Поштове віділення"}
                <br />
                <input
                  placeholder={
                    isEnglish
                      ? "Enter your post department"
                      : "Введіть поштове віділення"
                  }
                  type="text"
                  {...register("post", {
                    required: `${
                      isEnglish
                        ? "This field must not be empty!"
                        : "Це поле не повинно бути порожнім!"
                    }`,
                    minLength: {
                      value: 1,
                    },
                  })}
                />
                <div className={classes.errorMessage}>
                  {errors?.post && (
                    <p>
                      {errors?.post?.message ||
                        `${isEnglish ? "Error" : "Помилка"}`}
                    </p>
                  )}
                </div>
              </label>

              <label className={`${errors?.city ? classes.Error : null}`}>
                {isEnglish ? "City Name" : "Назва міста"}
                <br />
                <input
                  placeholder={
                    isEnglish
                      ? "Enter name of your city"
                      : "Введіть назву міста"
                  }
                  type="text"
                  {...register("city", {
                    required: `${
                      isEnglish
                        ? "This field must not be empty!"
                        : "Це поле не повинно бути порожнім!"
                    }`,
                    minLength: {
                      value: 1,
                    },
                  })}
                />
                <div className={classes.errorMessage}>
                  {errors?.city && (
                    <p>
                      {errors?.city?.message ||
                        `${isEnglish ? "Error" : "Помилка"}`}
                    </p>
                  )}
                </div>
              </label>
            </div>
            <div className={classes.FormBlock}>
              <h2>{isEnglish ? "Comment" : "Коментарій"}</h2>
              <label>
                <br />
                <textarea
                  placeholder={
                    isEnglish ? "Write your comment" : "Напишіть ваш коментарій"
                  }
                  type="text"
                  {...register("comment")}
                />
              </label>
            </div>
            <div className={classes.formSubmitButton}>
              <button type="submit" disabled={!isValid}>
                {isEnglish ? "Create Order" : "Замовити"}
              </button>
            </div>
            {isLoading && <Loader light />}
            {isLoading && (
              <div className={classes.loadingInfo}>
                {isEnglish ? `Creating Order...` : `Створення замовлення...`}
              </div>
            )}
            {!isLoading && error && (
              <div className={classes.loadingInfo}>
                {isEnglish
                  ? `The order was not created (Reason: ${error})`
                  : `Замовлення не було створено (Причина: ${error})`}
              </div>
            )}
            {!isLoading && !error && isSuccess && (
              <div className={classes.loadingInfo}>
                {isEnglish
                  ? `The order was created successfully`
                  : `Замовлення було створено успішно`}
              </div>
            )}
          </div>
        </div>
      </form>
    </>
  );
};

export default OrderForm;
