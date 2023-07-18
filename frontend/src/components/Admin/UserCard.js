import React, { useContext, useState } from "react";
import classes from "./UserCard.module.css";
import Modal from "../../UI/Modal";
import ErrorModel from "../../UI/ErrorModal";
import ConfirmModal from "../../UI/ConfirmModal";
import { LanguageContext } from "../../context/LanguageContext";
import { AuthContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import googleIcon from "../../assets/Settings/icon-google.svg";

const UserCard = (props) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const [isChanging, setIsChanging] = useState(false);
  const [isChanged, setIsChanged] = useState(false);

  const [isConfirming, setIsConfirming] = useState(false);
  const [error, setError] = useState(null);

  const { logout, token, userId, role } = useContext(AuthContext);
  const { language } = useContext(LanguageContext);
  let isEnglish = language === "en";

  const time = props.user.time;

  let timeLang = isEnglish ? "en-US" : "uk-UA";
  const currentDate = time ? new Date(time) : new Date();
  const formattedDate = currentDate.toLocaleString(timeLang, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const formattedTime = currentDate.toLocaleString(timeLang, {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });

  const deleteHandler = async () => {
    try {
      setIsDeleting(true);
      setError(null);
      if (!props.user.id || props.user.id === "") {
        throw new Error("There is no userId");
      }
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}${props.user.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + token,
          },
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }
      setIsDeleting(false);
      setIsDeleted(true);
    } catch (err) {
      console.log(err);
      setError(err.message || "Something went wrong, please try again  ");
      setIsDeleting(false);
    }
  };

  const changeRole = async (userIdToChange, role) => {
    try {
      setError(null);
      setIsChanged(false);
      setIsChanging(true);
      if (!userIdToChange || userIdToChange === "") {
        throw new Error("There is no userId");
      }
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}admin/${userIdToChange}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + token,
          },
          body: JSON.stringify({
            role,
            userId,
          }),
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }
      setIsChanged(true);
      setIsChanging(false);
    } catch (err) {
      console.log(err);
      setError(err.message || "Something went wrong, please try again  ");
      setIsChanged(false);
      setIsChanging(false);
    }
  };

  return (
    <div className={`${classes.UserCard}`}>
      <div className={classes.wrapper}>
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
        {isConfirming && (
          <Modal
            onClick={() => {
              setIsConfirming(false);
            }}
          >
            <ConfirmModal
              textEnglish={"Do you really want to delete the user!?"}
              textUkranian={"Ви насправді хочете видалити юзера!?"}
              onUnconfirm={() => {
                setIsConfirming(false);
              }}
              onConfirm={() => {
                setIsConfirming(false);
                deleteHandler();
              }}
            />
          </Modal>
        )}
        <div
          className={`${classes.UserCardContent} ${
            isDeleted ? classes.deleted : null
          }`}
        >
          <div className={classes.UserCardContentInfo}>
            <div className={classes.Status}>
              <span
                className={`${
                  props.user.role === "user"
                    ? classes.spanUser
                    : classes.spanAdmin
                }`}
              >
                {props.user.role}
              </span>
              {props.user.byGoogle && (
                <img
                  src={googleIcon}
                  className={classes.googleIcon}
                  alt=""
                  height={20}
                />
              )}

              {props.user.name}
            </div>
            <div className={classes.Check}>
              {isEnglish ? "User id: " : "Юзер id: "}
              <span>{props.user.id}</span>
            </div>
            <div className={classes.Check}>
              {"Email: "}
              <span>
                {props.user.confirmedEmail ? "(Ok) " : "(!Ok) "}
                {props.user.email}
              </span>
            </div>

            <div className={classes.Date}>{formattedDate}</div>
            <div className={classes.Date}>
              {isEnglish ? "At " : "O "}
              {formattedTime}
            </div>

            {!props.isOrdering && (
              <div
                className={`${classes.delete} ${
                  isDeleted ? classes.deleted : null
                }`}
                onClick={isDeleted ? null : () => setIsConfirming(true)}
              >
                {isDeleting && isEnglish && "Deleting..."}
                {isDeleting && !isEnglish && "Видаляється..."}
                {!isDeleting && isEnglish && !isDeleted && "Delete"}
                {!isDeleting && !isEnglish && !isDeleted && "Видалити"}
                {!isDeleting && isEnglish && isDeleted && "Deleted"}
                {!isDeleting && !isEnglish && isDeleted && "Видалено"}
              </div>
            )}
          </div>
          <div className={classes.UserCardContentDescription}>
            <div className={classes.DescTitle}>
              {isEnglish ? "Address" : "Адрес"}
            </div>
            <div className={classes.Check}>
              {isEnglish ? "City: " : "Місто: "}
              <span>{props.user.city}</span>&nbsp;
              {isEnglish ? "Post: " : "Пошта: "}
              <span>{props.user.post} </span>
            </div>
            <div className={classes.Check}>
              {isEnglish ? "Number: " : "Номер: "}
              <span>{props.user.number}&nbsp;</span>
            </div>
            <div className={classes.Check}>
              {isEnglish ? "Orders: " : "Замовлення: "}
              <Link
                to={"/orders"}
                onClick={() => {
                  localStorage.setItem("user_id_for_orders", props.user.id);
                }}
                className={classes.UserOrders}
              >
                <span>{props.user.orders.length}</span>
              </Link>
            </div>
            <div className={classes.Check}>
              {role === "main" ? (
                props.user.role === "user" ? (
                  <button
                    className={classes.ButtonToAdmin}
                    onClick={() => {
                      changeRole(props.user.id, "admin");
                    }}
                  >
                    {isChanging && isEnglish && "Changing..."}
                    {isChanging && !isEnglish && "Змінюємо..."}
                    {!isChanging &&
                      isEnglish &&
                      !isChanged &&
                      "Change to admin"}
                    {!isChanging &&
                      !isEnglish &&
                      !isChanged &&
                      "Зробити адміном"}
                    {!isChanging && isEnglish && isChanged && "Changed"}
                    {!isChanging && !isEnglish && isChanged && "Змінено"}
                  </button>
                ) : (
                  <button
                    className={classes.ButtonToUser}
                    onClick={() => {
                      changeRole(props.user.id, "user");
                    }}
                  >
                    {isChanging && isEnglish && "Changing..."}
                    {isChanging && !isEnglish && "Змінюємо..."}
                    {!isChanging && isEnglish && !isChanged && "Change to user"}
                    {!isChanging &&
                      !isEnglish &&
                      !isChanged &&
                      "Зробити юзером"}
                    {!isChanging && isEnglish && isChanged && "Changed"}
                    {!isChanging && !isEnglish && isChanged && "Змінено"}
                  </button>
                )
              ) : null}
            </div>
          </div>
          <div className={classes.UserCardContentImg}>
            <img src={props.user.image} width={130} height={130} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
