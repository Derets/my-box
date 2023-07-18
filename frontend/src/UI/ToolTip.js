import React from "react";
import classes from "./ToolTip.module.css";
import infoIcon from "../assets/Settings/icons-info.svg";
import infoIconLight from "../assets/Settings/icons-info-light.svg";

const Tooltip = (props) => {
  const tooltipClass = `${classes.tooltip} ${
    props.light ? classes.light : null
  } ${props.bottom ? classes.bottom : null}`;

  return (
    <div className={tooltipClass}>
      {props.light ? (
        <img src={infoIconLight} alt="" width={20} height={20} />
      ) : (
        <img src={infoIcon} alt="" width={20} height={20} />
      )}

      <span className={classes.tooltiptext}>{props.text}</span>
    </div>
  );
};

export default Tooltip;
