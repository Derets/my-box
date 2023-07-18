import React, { useContext } from "react";
import classes from "./Footer.module.css";
import linkedinImg from "../../assets/About/linkedin.svg";
import instagramImg from "../../assets/MainPage/instagram.svg";
import githubImg from "../../assets/MainPage/github.svg";
import Logo from "../../assets/Settings/Logo.svg";
import { LanguageContext } from "../../context/LanguageContext";

const Footer = () => {
  const { language } = useContext(LanguageContext);
  let isEnglish = language === "en";
  return (
    <footer>
      <div className={classes.weapper}>
        <div className={classes.FooterContent}>
          <div className={classes.FooterImg}>
            <img src={Logo} alt="footerimg" height={60} />
          </div>
          <div className={classes.FooterLinks}>
            <a
              href="https://www.linkedin.com/in/andrey-derets/"
              target="_blank"
            >
              <img src={linkedinImg} alt="" height={32} />
            </a>
            <a
              href="https://www.instagram.com/andreyderets/?hl=ru"
              target="_blank"
            >
              <img src={instagramImg} alt="" height={32} />
            </a>
            <a href="https://github.com/Derets" target="_blank">
              <img src={githubImg} alt="" height={32} />
            </a>
          </div>
          <div className={classes.FooterCoop}>{`©${
            process.env.REACT_APP_DOMAIN || "MyBox"
          } 2023`}</div>
          <div className={classes.FooterAuthor}>
            {isEnglish ? "Developed by" : "Розробив"}
            &nbsp;
            <a
              href="https://www.linkedin.com/in/andrey-derets/"
              target="_blank"
            >
              {isEnglish ? "Andrey Derets" : "Андрій Дерець"}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
