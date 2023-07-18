import React, { useContext } from "react";
import classes from "./Gallery.module.css";
import { LanguageContext } from "../../context/LanguageContext";

const Gallery = () => {
  const { language } = useContext(LanguageContext);
  let isEnglish = language === "en";
  return (
    <section className={classes.Gallery} id="Gallery">
      <div className={classes.wrapper}>
        <div className={classes.GalleryContent}>
          <div className={classes.GalleryText}>
            {isEnglish ? "Inspiration Gallery" : "Галерея натхнення"}
          </div>
          <div className={classes.GalleryPhotos}>
            <div className={classes.GalleryPhoto1}></div>
            <div className={classes.GalleryPhoto2}>
              <div className={classes.GalleryImg}>
                <span className={classes.GallerySpan5}>&nbsp;</span>
                <span className={classes.GallerySpan6}>&nbsp;</span>
                <span className={classes.GallerySpan7}>&nbsp;</span>
                <span className={classes.GallerySpan8}>&nbsp;</span>
              </div>
            </div>
            <div className={classes.GalleryPhoto3}>
              <div className={classes.GalleryImg}>
                <span className={classes.GallerySpan1}>&nbsp;</span>
                <span className={classes.GallerySpan2}>&nbsp;</span>
                <span className={classes.GallerySpan3}>&nbsp;</span>
                <span className={classes.GallerySpan4}>&nbsp;</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
