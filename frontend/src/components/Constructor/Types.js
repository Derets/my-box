import React, { useContext, useEffect, useState } from "react";
import classes from "./Types.module.css";
import CasketBox from "../../assets/BoxImgs/CascetBox.webp";
import CubeBox from "../../assets/BoxImgs/CubeBox.webp";
import sliderBox from "../../assets/BoxImgs/sliderBox.webp";
import { LanguageContext } from "../../context/LanguageContext";

const Types = (props) => {
  const { language } = useContext(LanguageContext);
  let isEnglish = language === "en";
  const [activeType, setActiveType] = useState("CubeBox");
  useEffect(() => {
    setActiveType(props.activeType);
  }, [props.activeType]);
  return (
    <section className={classes.TypesSection}>
      <div className={classes.wrapper}>
        <div className={classes.TypesContent}>
          <h2>{isEnglish ? "Choose type" : "Обери конструктив"}</h2>
          <div className={classes.sliderContainer}>
            <div className={classes.Variants}>
              <div
                className={classes.Variant}
                onClick={() => {
                  props.onClick("CasketBox");
                }}
              >
                <img src={CasketBox} alt="" />
                <div
                  className={`${classes.VariantContent} ${
                    activeType === "CasketBox" ? classes.activeType : null
                  }`}
                >
                  <div className={classes.VariantTitle}>CasketBox</div>
                </div>
              </div>
              <div
                className={classes.Variant}
                onClick={() => {
                  props.onClick("CubeBox");
                }}
              >
                <img src={CubeBox} alt="" />
                <div
                  className={`${classes.VariantContent} ${
                    activeType === "CubeBox" ? classes.activeType : null
                  }`}
                >
                  <div className={classes.VariantTitle}>CubeBox</div>
                </div>
              </div>

              <div
                className={classes.Variant}
                onClick={() => {
                  props.onClick("SliderBox");
                }}
              >
                <img src={sliderBox} alt="" />
                <div
                  className={`${classes.VariantContent} ${
                    activeType === "SliderBox" ? classes.activeType : null
                  }`}
                >
                  <div className={classes.VariantTitle}>SliderBox</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Types;
