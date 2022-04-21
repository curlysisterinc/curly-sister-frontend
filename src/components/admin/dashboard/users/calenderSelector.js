/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";

function HeaderSelector({ text, index, selected, setActive, classType }) {
  return (
    <div
      className={classType}
      onClick={() => setActive(index)}
      style={{
        backgroundColor: index === selected ? "#35ebc7" : "transparent",
        color: index === selected ? "black" : "black",
        transition: "background-color 1s",
      }}
    >
      {" "}
      {text}{" "}
    </div>
  );
}

export default HeaderSelector;
