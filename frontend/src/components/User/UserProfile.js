import React, { useContext, useEffect, useState } from "react";
import classes from "./UserProfile.module.css";
import { LanguageContext } from "../../context/LanguageContext";
import Modal from "../../UI/Modal";
import ErrorModel from "../../UI/ErrorModal";
import SuccessModel from "../../UI/SuccessModal";
import ConfirmModal from "../../UI/ConfirmModal";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Loader from "../../UI/Loader";
import googleIcon from "../../assets/Settings/icon-google.svg";
import Tooltip from "../../UI/ToolTip";

const UserProfile = () => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("user");
  const [email, setEmail] = useState("");
  const [byGoogle, setByGoogle] = useState(false);
  const [number, setNumber] = useState("");
  const [orders, setOrders] = useState(0);
  const [city, setCity] = useState("");
  const [post, setPost] = useState("");
  const [password, setPassword] = useState("");
  const [newpassword, setNewpassword] = useState("");
  const [newpassword2, setNewpassword2] = useState("");

  const [error, setError] = useState(null);

  const [isDeleting, setIsDeleting] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);

  const [isSuccess, setIsSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  let userId = localStorage.getItem("user_id");

  const { logout, token, isLoggedIn } = useContext(AuthContext);
  const { language } = useContext(LanguageContext);
  let isEnglish = language === "en";

  const navigate = useNavigate();
  const fetchData = async () => {
    setIsLoading(true);
    if (userId) {
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
        setCity(data.user.city);
        setPost(data.user.post);
        setRole(data.user.role);
        setByGoogle(data.user.byGoogle);
        setName(data.user.name);
        setEmail(data.user.email);
        setNumber(data.user.number);
        setOrders(data.user.orders.length);
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

  const deleteHandler = async () => {
    try {
      setIsDeleting(true);
      setError(null);
      if (!userId || userId === "") {
        throw new Error("There is no userId");
      }
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}${userId}`,
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
      localStorage.setItem("user_id", "");
      logout();
      navigate("/authentication");
    } catch (err) {
      console.log(err);
      setError(err.message || "Something went wrong, please try again  ");
      setIsDeleting(false);
    }
  };

  const UpdateHandler = async () => {
    try {
      setIsSaving(true);
      setError(null);
      if (!userId || userId === "") {
        throw new Error("There is no userId, please go back to the order list");
      }
      if (newpassword === "" && newpassword2 === "" && password === "") {
      } else if (newpassword === "" || newpassword2 === "" || password === "") {
        throw new Error("Please enter a valid password");
      } else if (newpassword !== newpassword2) {
        throw new Error(
          "New passwords are different, please enter valid passwords"
        );
      }

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}${userId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + token,
          },
          body: JSON.stringify({
            name,
            password,
            newpassword,
            post,
            number,
            city,
          }),
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }
      setIsSaving(false);
      setIsSuccess(true);
      setIsSaved(true);
    } catch (err) {
      console.log(err);
      setError(err.message || "Something went wrong, please try again  ");
      setIsSaving(false);
    }
  };

  return (
    <section className={classes.ProfileSection}>
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
      {isSuccess && (
        <Modal
          onClick={() => {
            setIsSuccess(false);
          }}
        >
          <SuccessModel
            text={"Saved Successfully"}
            onClick={() => {
              setIsSuccess(false);
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
            textEnglish={"Do you really want to delete your account?"}
            textUkranian={"Ви насправді хочете видалити свій аккаунт?"}
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
      <div className={classes.wrapper}>
        <div className={classes.ProfileContent}>
          <div className={classes.ProfileTitle}>
            {isEnglish ? "My Profile" : "Мій профіль"}
            {byGoogle && <img src={googleIcon} height={30} />}
            {byGoogle && (
              <p>
                <Tooltip
                  bottom
                  text={
                    isEnglish
                      ? "The Google icon is an indicator that you have registered using Google authentication"
                      : "Значок гугл є індикатором, що ви зарєєструвались за допомогою гугл-аутентифікації"
                  }
                />
              </p>
            )}
          </div>
          <div className={classes.ProfileInfo}>
            <div className={classes.ProfileInputs}>
              {isLoading && <Loader />}
              {!byGoogle ? (
                <div className={classes.ProfileInput}>
                  <span className={classes.ProfileLabel}>
                    <p>{isEnglish ? "Name" : "Ім'я"}</p>
                  </span>
                  <input
                    placeholder={
                      isEnglish ? "Enter you name" : "Введіть ваше ім`я"
                    }
                    value={name}
                    type="text"
                    onChange={(e) => {
                      setName(e.target.value);
                      setIsSaved(false);
                    }}
                  />
                </div>
              ) : (
                <div className={classes.ProfileInput}>
                  <span className={classes.ProfileLabel}>
                    <p>{isEnglish ? "Name" : "Ім'я"}</p>
                  </span>
                  <span className={classes.ProfileValue}>
                    <p>{name}</p>
                  </span>
                </div>
              )}
              <div className={classes.ProfileInput}>
                <span className={classes.ProfileLabel}>
                  <p>Email</p>
                </span>
                <span className={classes.ProfileValue}>
                  <p>{email}</p>
                </span>
              </div>
              <div className={classes.ProfileInput}>
                <span className={classes.ProfileLabel}>
                  <p>
                    {isEnglish ? "Tel. Number" : "Номер телефону"}
                    <Tooltip
                      bottom
                      text={
                        isEnglish
                          ? "Fill in your personal information to make further orders more convenient!"
                          : "Заповніть особисту інформацію, щоб робити подальші закази було зручніше!"
                      }
                    />
                  </p>
                </span>
                <input
                  placeholder={
                    isEnglish ? "Enter phone number" : "Введіть номер телефону"
                  }
                  type="text"
                  value={number}
                  onChange={(e) => {
                    setNumber(e.target.value);
                    setIsSaved(false);
                  }}
                />
              </div>
              <div className={classes.ProfileInput}>
                <span className={classes.ProfileLabel}>
                  <p>{isEnglish ? "City" : "Місто"}</p>
                </span>
                <input
                  placeholder={
                    isEnglish
                      ? "Enter name of your city"
                      : "Введіть назву міста"
                  }
                  type="text"
                  value={city}
                  onChange={(e) => {
                    setCity(e.target.value);
                    setIsSaved(false);
                  }}
                />
              </div>
              <div className={classes.ProfileInput}>
                <span className={classes.ProfileLabel}>
                  <p>{isEnglish ? "Post Department" : "Почтовий відділ"}</p>
                </span>
                <input
                  placeholder={
                    isEnglish
                      ? "Enter your post department"
                      : "Введіть поштове віділення"
                  }
                  type="text"
                  value={post}
                  onChange={(e) => {
                    setPost(e.target.value);
                    setIsSaved(false);
                  }}
                />
              </div>

              <div className={classes.ProfileInput}>
                <span className={classes.ProfileLabel}>
                  <p>User Id</p>
                </span>
                <span className={classes.ProfileValue}>
                  <p>
                    {userId}&nbsp;
                    {role === "admin" || role === "main"
                      ? `(Role: ${role})`
                      : ""}
                  </p>
                </span>
              </div>
              <div className={classes.ProfileInput}>
                <span className={classes.ProfileLabel}>
                  <p>
                    {isEnglish ? "Number of orders" : "Кількість замовлень"}
                  </p>
                </span>
                <span className={classes.ProfileValue}>
                  <p>
                    {orders}&nbsp;&nbsp;
                    <Link to={`/orders`} className={classes.ProfileOrdersLink}>
                      {isEnglish ? "To my orders" : "До моїх замовлень"}
                    </Link>
                  </p>
                </span>
              </div>
              {!byGoogle && (
                <div className={classes.ProfileInput}>
                  <span className={classes.ProfileLabel}>
                    <p>{isEnglish ? "Current password" : "Нинішній пароль"}</p>
                  </span>
                  <input
                    placeholder={
                      isEnglish
                        ? "Enter name of your current password"
                        : "Введіть нинішній пароль"
                    }
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setIsSaved(false);
                    }}
                  />
                </div>
              )}
              {!byGoogle && (
                <div className={classes.ProfileInput}>
                  <span className={classes.ProfileLabel}>
                    <p>{isEnglish ? "New password" : "Новий пароль"}</p>
                  </span>
                  <input
                    placeholder={
                      isEnglish
                        ? "Enter a new password"
                        : "Введіть новий пароль"
                    }
                    type="password"
                    id="newpassword"
                    value={newpassword}
                    onChange={(e) => {
                      setNewpassword(e.target.value);
                      setIsSaved(false);
                    }}
                  />
                </div>
              )}
              {!byGoogle && (
                <div className={classes.ProfileInput}>
                  <span className={classes.ProfileLabel}>
                    <p>{isEnglish ? "New password" : "Новий пароль"}</p>
                  </span>
                  <input
                    placeholder={
                      isEnglish
                        ? "Enter a new password one more time"
                        : "Введіть новий пароль ще раз"
                    }
                    type="password"
                    id="newpassword2"
                    value={newpassword2}
                    onChange={(e) => {
                      setNewpassword2(e.target.value);
                      setIsSaved(false);
                    }}
                  />
                </div>
              )}
            </div>

            <div className={classes.EditButtons}>
              <button
                className={classes.ProfileSaveButton}
                onClick={UpdateHandler}
                disabled={isSaved}
              >
                {isSaving && isEnglish && "Saving..."}
                {isSaving && !isEnglish && "Збереження..."}
                {!isSaving && isEnglish && "Save"}
                {!isSaving && !isEnglish && "Зберегти"}
              </button>
              <button
                className={classes.ProfileDeleteButton}
                onClick={() => setIsConfirming(true)}
              >
                {isEnglish ? "Delete my account" : "Видалити мій аккаунт"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
