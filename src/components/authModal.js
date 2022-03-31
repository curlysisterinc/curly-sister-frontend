/* eslint-disable import/no-cycle */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable prefer-regex-literals */
import React from "react";

function AuthModalComponent({ handleClose, children }) {
  return (
    <div
      onClick={handleClose}
      className=" fixed top-0 left-0 h-full bg-black-100 w-full flex  justify-center items-center"
    >
      <section
        className=" bg-white rounded h-auto p-10 flex flex-col justify-center items-center top-1/2 left-1/2 translate"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </section>
    </div>
  );
}

export default AuthModalComponent;
