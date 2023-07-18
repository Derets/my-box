import React from "react";
import classes from "./OrderBoxLoader.module.css";

const OrderBoxLoader = () => {
  return (
    <div className={classes.orderCardSceleton}>
      <div className={classes.orderCardSceletonInfo}>
        <div className={classes.orderCardSceletonStatus}></div>
        <div className={classes.orderCardSceletonBasicLine}></div>
        <div className={classes.orderCardSceletonSmallLine}></div>
        <div className={classes.orderCardSceletonLargeLine}></div>
        <div className={classes.orderCardSceletonSmallLine}></div>
      </div>
      <div className={classes.orderCardSceletonDescription}>
        <div className={classes.orderCardSceletonStatus}></div>
        <div className={classes.orderCardSceletonLargeLine}></div>
        <div className={classes.orderCardSceletonBasicLine}></div>
        <div className={classes.orderCardSceletonSmallLine}></div>
        <div className={classes.orderCardSceletonSmallLine}></div>
      </div>
      <div className={classes.OBcontentModel}></div>
    </div>
  );
};

export default OrderBoxLoader;
