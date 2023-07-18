import React from "react";
import OrderForm from "../components/Constructor/OrderForm";
import OrderedBox from "../components/User/OrderedBox";
import { useLocation } from "react-router-dom";

const Ordering = () => {
  const location = useLocation();
  const dataObject = location?.state;

  return (
    <>
      <OrderedBox order={dataObject} isOrdering />
      <OrderForm
        colorOne={dataObject?.colorOne}
        colorTwo={dataObject?.colorTwo}
        colorThree={dataObject?.colorThree}
        width={dataObject?.width}
        height={dataObject?.height}
        length={dataObject?.length}
        boxType={dataObject?.boxType}
        amount={dataObject?.amount}
        price={dataObject?.price}
      />
    </>
  );
};

export default Ordering;
