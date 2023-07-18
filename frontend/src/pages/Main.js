import React from "react";
import Hero from "../components/Main/Hero";
import FourFigures from "../components/Main/FourFigures";
import Clever from "../components/Main/Clever";
import Ovals from "../components/Main/Ovals";
import FinalText from "../components/Main/FinalText";
import Gallery from "../components/Main/Gallery";
import MiddleText from "../components/Main/MiddleText";
import TopText from "../components/Main/TopText";
import Questions from "../components/Main/Questions";

const Main = () => {
  return (
    <>
      <Hero />
      <FourFigures />
      <TopText />
      <Clever />
      <MiddleText />
      <Gallery />
      <Questions />
      <Ovals />
      <FinalText />
    </>
  );
};

export default Main;
