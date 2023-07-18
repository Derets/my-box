import React, { useContext, useEffect, useState } from "react";
import classes from "./Header.module.css";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { LanguageContext } from "../../context/LanguageContext";
import DroppedMenu from "./DroppedMenu";
import RadioButton from "../../UI/RadioButton";
import { AuthContext } from "../../context/AuthContext";
import ReactDOM from "react-dom";

const Backdrop = (props) => {
  return <div onClick={props?.onClick} className={classes.backdrop}></div>;
};

const Header = () => {
  const [shrinkHeader, setShrinkHeader] = useState(false);
  const [burgerMenuVisible, setBurgerMenuVisible] = useState(false);
  const { language, switchLanguage } = useContext(LanguageContext);
  const { isLoggedIn, logout, role } = useContext(AuthContext);
  let isEnglish = language === "en";
  let isAdmin = role === "admin" || role === "main";
  const navigate = useNavigate();
  const scrollToTop = () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  };

  let viewportHeight = window.innerHeight;
  const location = useLocation();
  const currentPath = location.pathname;
  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    if (scrollPosition > viewportHeight - 100) {
      setShrinkHeader(true);
    } else {
      setShrinkHeader(false);
    }
  };
  useEffect(() => {
    // pages that don't have a hero section
    let isShrink =
      currentPath === "/admin" ||
      currentPath === "/orders" ||
      currentPath === "/edit" ||
      currentPath === "/authentication" ||
      currentPath === "/profile" ||
      currentPath === "/ordering" ||
      currentPath.includes("/emailconfirmation");

    if (isShrink) {
      setShrinkHeader(true);
    } else {
      setShrinkHeader(false);
      window.addEventListener("scroll", handleScroll);
    }
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [viewportHeight, location]);

  const portalElement = document.getElementById("overlays");

  const burgerMenuSwitcher = () => {
    setBurgerMenuVisible((prev) => !prev);
  };

  return (
    <header className={shrinkHeader ? classes["shrink"] : ""}>
      <div className={classes.wrapper}>
        <div className={classes["header__content"]}>
          <NavLink
            to="/"
            className={classes.logo}
            onClick={() => {
              scrollToTop();
              if (burgerMenuVisible) {
                burgerMenuSwitcher();
              }
            }}
          >
            MyBox
          </NavLink>

          <div
            className={`${classes.HeaderToggle} ${
              burgerMenuVisible ? classes.activeMenu : null
            } ${shrinkHeader ? classes.shrink : null}`}
            onClick={burgerMenuSwitcher}
          >
            <span></span>
          </div>
          {burgerMenuVisible &&
            ReactDOM.createPortal(
              <Backdrop onClick={burgerMenuSwitcher} />,
              portalElement
            )}

          <nav
            className={`${shrinkHeader ? classes.large : null} ${
              burgerMenuVisible ? classes.activeMenu : null
            }`}
          >
            <NavLink
              to="/"
              className={({ isActive }) =>
                !isActive
                  ? classes["nav__item"]
                  : classes["nav__item activeLink"]
              }
              onClick={() => {
                scrollToTop();
                if (burgerMenuVisible) {
                  burgerMenuSwitcher();
                }
              }}
            >
              {isEnglish ? "Main" : "Головна"}
            </NavLink>
            <NavLink
              to="/constructor"
              className={({ isActive }) =>
                isActive
                  ? classes["nav__item activeLink"]
                  : classes["nav__item"]
              }
              onClick={() => {
                scrollToTop();
                if (burgerMenuVisible) {
                  burgerMenuSwitcher();
                }
              }}
            >
              {isEnglish ? "3D-constructor" : "3D-конструктор"}
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                !isActive
                  ? classes["nav__item"]
                  : classes["nav__item activeLink"]
              }
              onClick={() => {
                scrollToTop();
                if (burgerMenuVisible) {
                  burgerMenuSwitcher();
                }
              }}
            >
              {isEnglish ? "About" : "Про нас"}
            </NavLink>
            <div className={classes.DroppedMenu}>
              <div className={classes.DroppedMenuLink}>
                {!isLoggedIn ? (
                  <NavLink
                    to={"/authentication"}
                    onClick={() => {
                      scrollToTop();
                      if (burgerMenuVisible) {
                        burgerMenuSwitcher();
                      }
                    }}
                  >
                    {isEnglish ? "Sign Up / Log In" : "Вхід / Реєстрація"}
                  </NavLink>
                ) : (
                  <NavLink
                    to={"/profile"}
                    onClick={() => {
                      scrollToTop();
                      if (burgerMenuVisible) {
                        burgerMenuSwitcher();
                      }
                    }}
                  >
                    {isEnglish ? "My Profile" : "Мій Профіль"}
                  </NavLink>
                )}
              </div>
              {isLoggedIn ? (
                <>
                  <div className={classes.DroppedMenuLink}>
                    <NavLink
                      to={"/orders"}
                      onClick={() => {
                        scrollToTop();
                        if (burgerMenuVisible) {
                          burgerMenuSwitcher();
                        }
                        let user_id = localStorage.getItem("user_id");
                        localStorage.setItem("user_id_for_orders", user_id);
                      }}
                    >
                      {isEnglish ? "My Orders" : "Мої замовлення"}
                    </NavLink>
                  </div>
                </>
              ) : null}
              {isLoggedIn ? (
                <>
                  <div
                    className={classes.DroppedMenuLink}
                    onClick={() => {
                      localStorage.setItem("user_id", "");
                      if (burgerMenuVisible) {
                        burgerMenuSwitcher();
                      }
                      logout();
                      navigate("/authentication");
                    }}
                  >
                    {isEnglish ? "Logout" : "Вийти"}
                  </div>
                </>
              ) : null}
              {isAdmin && (
                <>
                  <div className={classes.DroppedMenuLink}>
                    <NavLink
                      to={"/admin"}
                      onClick={() => {
                        scrollToTop();
                        if (burgerMenuVisible) {
                          burgerMenuSwitcher();
                        }
                      }}
                    >
                      {isEnglish ? "Admin Panel" : "Адмін панель"}
                    </NavLink>
                  </div>
                </>
              )}

              <div className={classes.DroppedMenuLanguage}>
                <RadioButton isShrink={shrinkHeader}>
                  <label onClick={() => switchLanguage("ua")}>
                    <input
                      type="radio"
                      name="language"
                      defaultChecked={!isEnglish}
                    />
                    <span>UA</span>
                  </label>
                  <label onClick={() => switchLanguage("en")}>
                    <input
                      type="radio"
                      name="language"
                      defaultChecked={isEnglish}
                    />
                    <span>EN</span>
                  </label>
                </RadioButton>
              </div>
            </div>
          </nav>

          <DroppedMenu
            isShrink={shrinkHeader}
            onClick={scrollToTop}
            className={classes.DroppedMenuElement}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
