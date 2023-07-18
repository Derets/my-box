import React, { useState } from "react";
import Welcome from "../components/Constructor/Welcome";
import Types from "../components/Constructor/Types";
import Settings from "../components/Constructor/Settings";

const Constructor = () => {
  const [currentBoxType, setCurrentBoxType] = useState("SliderBox"); //default
  const boxTypeHandler = (type) => {
    setCurrentBoxType(type);
  };
  return (
    <>
      <Welcome />
      <Types onClick={boxTypeHandler} activeType={currentBoxType} />
      <Settings activeType={currentBoxType} />
    </>
  );
};

export default Constructor;
