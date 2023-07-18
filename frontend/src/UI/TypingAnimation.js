import React, { useEffect, useState } from "react";
import classes from "./TypingAnimation.module.css";

const TypingAnimation = (props) => {
  const [text, setText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const sentence = props.text ? props.text : "Something went wrong";
  useEffect(() => {
    let textIndex = 0;

    const typingInterval = setInterval(() => {
      if (textIndex < sentence.length - 1) {
        setText((prevText) => prevText + sentence[textIndex].toString());
        textIndex++;
      } else {
        clearInterval(typingInterval);
        // setShowCursor(false);
      }
    }, 200);

    return () => {
      clearInterval(typingInterval);
      setText("");
    };
  }, [props.text]);

  return (
    <div className={classes.typingAnimation}>
      <span>{text}</span>
      {showCursor && <span className={classes.cursor}>|</span>}
    </div>
  );
};

export default TypingAnimation;
