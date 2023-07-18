import React, { useContext } from "react";
import classes from "./DroppedMenu.module.css";
import loginImg from "../../assets/Settings/login-svgrepo-com.svg";
import profileImg from "../../assets/Settings/profile-round-1342-svgrepo-com.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { LanguageContext } from "../../context/LanguageContext";
import RadioButton from "../../UI/RadioButton";
import { AuthContext } from "../../context/AuthContext";

const DroppedMenu = (props) => {
  const { language, switchLanguage } = useContext(LanguageContext);
  const { isLoggedIn, logout, role } = useContext(AuthContext);
  const navigate = useNavigate();
  let isEnglish = language === "en";
  let isAdmin = role === "admin" || role === "main";
  return (
    <div
      className={`${classes.ImgDiv} ${props.isShrink ? classes.shrink : null}`}
    >
      {isLoggedIn ? (
        <img src={profileImg} alt="" width={25} height={25} />
      ) : (
        <img src={loginImg} alt="" width={25} height={25} />
      )}

      <div className={classes.DroppedMenu}>
        <div className={classes.DroppedMenuLink}>
          {!isLoggedIn ? (
            <NavLink to={"/authentication"} onClick={props.onClick}>
              {isEnglish ? "Sign Up / Log In" : "Вхід / Реєстрація"}
            </NavLink>
          ) : (
            <NavLink
              to={"/profile"}
              onClick={props.onClick}
              className={({ isActive }) =>
                !isActive
                  ? classes["nav__item"]
                  : classes["nav__item activeLink"]
              }
            >
              {isEnglish ? "My Profile" : "Мій Профіль"}
            </NavLink>
          )}
        </div>
        <div className={classes.DMSeparatorLine}>.</div>
        {isLoggedIn ? (
          <>
            <div className={classes.DroppedMenuLink}>
              <NavLink
                to={"/orders"}
                className={({ isActive }) =>
                  !isActive
                    ? classes["nav__item"]
                    : classes["nav__item activeLink"]
                }
                onClick={() => {
                  props.onClick();
                  let user_id = localStorage.getItem("user_id");
                  localStorage.setItem("user_id_for_orders", user_id);
                }}
              >
                {isEnglish ? "My Orders" : "Мої замовлення"}
              </NavLink>
            </div>
            <div className={classes.DMSeparatorLine}>.</div>
          </>
        ) : null}
        {isLoggedIn ? (
          <>
            <div
              className={classes.DroppedMenuLink}
              onClick={() => {
                localStorage.setItem("user_id", "");
                logout();
                navigate("/authentication");
              }}
            >
              {isEnglish ? "Logout" : "Вийти"}
            </div>
            <div className={classes.DMSeparatorLine}>.</div>
          </>
        ) : null}
        {isAdmin && (
          <>
            <div className={classes.DroppedMenuLink}>
              <NavLink
                to={"/admin"}
                onClick={props.onClick}
                className={({ isActive }) =>
                  !isActive
                    ? classes["nav__item"]
                    : classes["nav__item activeLink"]
                }
              >
                {isEnglish ? "Admin Panel" : "Адмін панель"}
              </NavLink>
            </div>
            <div className={classes.DMSeparatorLine}>.</div>
          </>
        )}

        <div className={classes.DroppedMenuLanguage}>
          <RadioButton isShrink={props.isShrink}>
            <label onClick={() => switchLanguage("ua")}>
              <input type="radio" name="language" defaultChecked={!isEnglish} />
              <span>UA</span>
            </label>
            <label onClick={() => switchLanguage("en")}>
              <input type="radio" name="language" defaultChecked={isEnglish} />
              <span>EN</span>
            </label>
          </RadioButton>
        </div>
      </div>
    </div>
  );
};

export default DroppedMenu;
