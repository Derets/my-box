import React, { useContext, useEffect, useState } from "react";
import OrderedBox from "./OrderedBox";
import { LanguageContext } from "../../context/LanguageContext";
import classes from "./UserOrders.module.css";
import Loader from "../../UI/Loader";
import { AuthContext } from "../../context/AuthContext";
import Modal from "../../UI/Modal";
import ConfirmModal from "../../UI/ConfirmModal";
import OrderBoxLoader from "../../UI/OrderBoxLoader";
import { useNavigate } from "react-router-dom";

const UserOrders = () => {
  const [ordersPrice, setOrdersPrice] = useState(0);
  const [ordersData, setOrdersData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);

  const { role } = useContext(AuthContext);
  let isAdmin = role === "admin" || role === "main";
  let userId =
    (isAdmin && localStorage.getItem("user_id_for_orders")) ||
    localStorage.getItem("user_id");

  const { token, isLoggedIn } = useContext(AuthContext);
  const { language } = useContext(LanguageContext);
  let isEnglish = language === "en";

  const navigate = useNavigate();

  const deleteAllOrders = async () => {
    setIsDeleting(false);
    setIsDeleted(false);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}${userId}/orders`,
        {
          method: "DELETE",
          headers: {
            authorization: "Bearer " + token,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Request failed");
      }
      const data = await response.json();
      setIsDeleting(false);
      setIsDeleted(true);
    } catch (error) {
      console.error(error);
      setIsDeleting(false);
      setIsDeleted(false);
    }
  };

  const fetchData = async () => {
    setIsLoading(true);

    if (userId) {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}${userId}/orders`,
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
        setOrdersData(data);
        const totalPrice = data.orders.reduce(
          (total, order) => total + order.price,
          0
        );
        setOrdersPrice(totalPrice.toFixed(2));
      } catch (error) {
        console.error(error);
      }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/authentication");
    }
    fetchData();
  }, []);

  return (
    <div className={classes.UserOrdersSection}>
      <div className={classes.wrapper}>
        {isConfirming && (
          <Modal
            onClick={() => {
              setIsConfirming(false);
            }}
          >
            <ConfirmModal
              textEnglish={"Do you really want to delete all orders!?"}
              textUkranian={"Ви насправді хочете видалити всі замовлення!?"}
              onUnconfirm={() => {
                setIsConfirming(false);
              }}
              onConfirm={() => {
                setIsConfirming(false);
                deleteAllOrders();
              }}
            />
          </Modal>
        )}
        <div className={classes.OrdersTitle}>
          {isEnglish ? "Orders" : "Замовлення"}
        </div>

        {!isLoading &&
        (ordersData === undefined || ordersData.orders.length === 0) ? (
          <div className={classes.OrdersTitle}>
            {isEnglish ? "There are no orders" : "Замовлень не знайдено"}
          </div>
        ) : (
          <>
            <button
              className={classes.OrdersDeleteAll}
              disabled={isDeleted}
              onClick={() => {
                setIsConfirming(true);
              }}
            >
              {isDeleting && isEnglish && "Deleting..."}
              {isDeleting && !isEnglish && "Видаляється..."}
              {!isDeleting && isEnglish && !isDeleted && "Delete all orders"}
              {!isDeleting &&
                !isEnglish &&
                !isDeleted &&
                "Видалити всі замовлення"}
              {!isDeleting && isEnglish && isDeleted && "Deleted"}
              {!isDeleting && !isEnglish && isDeleted && "Видалено"}
            </button>
            <p>
              {isEnglish ? "Total: $" : "Всього: $"}
              {ordersPrice}
            </p>
          </>
        )}
        {!userId && !isLoading && (
          <div className={classes.OrdersTitle}>
            {isEnglish
              ? "There is no user Id. Please re-log in"
              : "Ваш айді не знайдено. Будь ласка, перезайдіть"}
          </div>
        )}

        <div className={classes.UserOrders}>
          {ordersData &&
            ordersData.orders &&
            ordersData.orders.map((order, index) => {
              return <OrderedBox key={index} order={order} />;
            })}
          {isLoading && (
            <>
              <OrderBoxLoader />
              <OrderBoxLoader />
              <OrderBoxLoader />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserOrders;
