import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import classes from "./OrderedBox.module.css";
import SelectModel from "../3dModels/SelectModel";
import { LanguageContext } from "../../context/LanguageContext";
import Modal from "../../UI/Modal";
import ErrorModel from "../../UI/ErrorModal";
import ConfirmModal from "../../UI/ConfirmModal";
import { AuthContext } from "../../context/AuthContext";
import Tooltip from "../../UI/ToolTip";
const OrderedBox = (props) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const { language } = useContext(LanguageContext);
  const { token } = useContext(AuthContext);
  let isEnglish = language === "en";

  const scrollToTop = () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  };
  const colorOne = props?.order?.colorOne || props?.order?.colors?.colorOne;
  const colorTwo = props?.order?.colorTwo || props?.order?.colors?.colorTwo;
  const colorThree =
    props?.order?.colorThree || props?.order?.colors?.colorThree;
  const width = props?.order?.width || props?.order?.size?.width;
  const height = props?.order?.height || props?.order?.size?.height;
  const length = props?.order?.length || props?.order?.size?.length;
  const boxType = props?.order?.boxType || props?.order?.typeOfBox;
  const orderId = props?.order?.orderId || props?.order?.id || "OrderId";
  const amount = props?.order?.amount;
  const updates = props?.order?.updates;
  const price = props?.order?.price;
  const time = props?.order?.time;

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
      if (!orderId || orderId === "OrderId") {
        throw new Error("There is no userId");
      }
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}orders/${orderId}`,
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

  return (
    <div className={`${classes.OBsection}`}>
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
              textEnglish={"Do you really want to delete!?"}
              textUkranian={"Ви насправді хочете видалити!?"}
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
          className={`${classes.OBcontent} ${
            isDeleted ? classes.deleted : null
          }`}
        >
          <div className={classes.OBcontentInfo}>
            <div className={classes.Status}>
              {isEnglish ? "Status" : "Статус"}
              {props.updates > 0 ? (
                <span className={classes.spanCreated}>
                  {isEnglish ? "Updated" : "Оновленний"}
                </span>
              ) : (
                <span className={classes.spanDone}>
                  {isEnglish ? "Done" : "Готовий"}
                </span>
              )}
            </div>
            <div className={classes.Date}>{formattedDate}</div>
            <div className={classes.Date}>
              {isEnglish ? "At " : "O "}
              {formattedTime}
            </div>
            <div className={classes.Check}>
              {isEnglish ? "Box type: " : "Тип боксу: "} <span>{boxType}</span>
            </div>
            <div className={classes.Check}>
              {isEnglish ? "Order id: " : "Заказ id: "} <span>{orderId}</span>
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
          <div className={classes.OBcontentDescription}>
            <div className={classes.DescTitle}>
              <p>
                {isEnglish ? "Characteristics" : "Характеристики"}
                {!props.isOrdering && (
                  <Tooltip
                    bottom
                    text={`Email: ${props?.order?.address?.email}; ${
                      isEnglish ? "Сity:" : "Місто:"
                    } ${props?.order?.address?.city}; 
                  ${isEnglish ? "Post:" : "Пошта:"} ${
                      props?.order?.address?.postDepartment
                    }; ${isEnglish ? "Number:" : "Номер:"} ${
                      props?.order?.address?.telNumber
                    };`}
                  />
                )}
              </p>
            </div>
            <div className={classes.Check}>
              {isEnglish ? "Size: " : "Розміри: "}
              <span>
                {length}x{width}х{height}
              </span>
              {}
              {updates > 0 && isEnglish && !props.isOrdering && " Updates: "}
              {updates > 0 && !isEnglish && !props.isOrdering && " Оновлено: "}
              {updates > 0 && !props.isOrdering && <span>{updates}</span>}
            </div>
            <div className={classes.Check}>
              {isEnglish ? "Colors: " : "Кольори: "}
              <span>
                {colorOne}/ {colorTwo}/{colorThree}
              </span>
            </div>
            <div className={classes.Check}>
              {isEnglish ? "Amount: " : "Кількість: "}
              <span>{amount}&nbsp;</span>
              {isEnglish ? "Price: " : "Ціна: "}
              <span>${price}</span>
            </div>
            <div
              className={`${classes.edit} ${
                isDeleted ? classes.deleted : null
              }`}
            >
              <Link
                to={
                  !isDeleted
                    ? window.location.pathname === "/ordering"
                      ? "/constructor"
                      : "/edit"
                    : null
                }
                onClick={
                  window.location.pathname !== "/ordering" && !isDeleted
                    ? () => {
                        let edit_order = {
                          length,
                          width,
                          height,
                          colorOne,
                          colorTwo,
                          colorThree,
                          orderId,
                          boxType,
                          amount,
                          price,
                        };
                        localStorage.setItem(
                          "edit_order",
                          JSON.stringify(edit_order)
                        );
                        scrollToTop();
                      }
                    : null
                }
              >
                {isEnglish ? "Edit" : "Редагувати"}
              </Link>
            </div>
          </div>
          <div className={classes.OBcontentModel}>
            <SelectModel
              zoom={2}
              enableRotate={false}
              enableZoom={false}
              autoRotate={!isDeleted}
              colorOne={colorOne}
              colorTwo={colorTwo}
              colorThree={colorThree}
              width={width * 0.025}
              length={length * 0.025}
              height={height * 0.025}
              boxType={boxType}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderedBox;
