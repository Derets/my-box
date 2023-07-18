import React, { useState } from "react";
import EditBox from "../components/User/EditBox";
import Types from "../components/Constructor/Types";

const Edit = () => {
  const [currentBoxType, setCurrentBoxType] = useState("CubeBox");
  const boxTypeHandler = (type) => {
    setCurrentBoxType(type);
  };
  return (
    <>
      <Types onClick={boxTypeHandler} activeType={currentBoxType} />
      <EditBox boxType={currentBoxType} onChangeBoxType={boxTypeHandler} />
    </>
  );
};

export default Edit;
