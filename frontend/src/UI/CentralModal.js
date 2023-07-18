import React, { useEffect } from "react";
import classes from "./Modal.module.css";
import ReactDOM from "react-dom";

const Backdrop = (props) => {
  return <div onClick={props?.onClick} className={classes.backdrop}></div>;
};
const ModalOverlay = (props) => {
  return (
    <div className={classes.centralModal}>
      <div>{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById("overlays");

const CentralModal = (props) => {
  useEffect(() => {
    const modalBtn = document.getElementById("modalBtn");
    modalBtn?.focus();
  }, []);
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClick={props?.onClick} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </>
  );
};

export default CentralModal;
