import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { LanguageContext } from "../../context/LanguageContext";
import UserCard from "./UserCard";
import Loader from "../../UI/Loader";
import Modal from "../../UI/Modal";
import ErrorModel from "../../UI/ErrorModal";
import classes from "./UsersList.module.css";
import OrderBoxLoader from "../../UI/OrderBoxLoader";
import { useNavigate } from "react-router-dom";

const UsersList = () => {
  const [error, setError] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [usersData, setUsersData] = useState(undefined);

  const { token, userId, isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const { language } = useContext(LanguageContext);
  let isEnglish = language === "en";

  const fetchData = async () => {
    setIsLoading(true);
    if (userId) {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}admin/users/${userId}`,
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
        setUsersData(data);
      } catch (error) {
        console.error(error);
        setError(error.message || "Something went wrong, please try again  ");
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
    <div className={classes.UsersListSection}>
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
      <div className={classes.wrapper}>
        <div className={classes.UsersList}>
          {usersData &&
            usersData.users &&
            usersData.users.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
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

export default UsersList;
