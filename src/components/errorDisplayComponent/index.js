import React from "react";
import OrangeBtn from "../customButton/orangeBtn";

function ErrorDisplayComponent({ refetch }) {
  return (
    <div className="m-auto w-full max-w-md flex justify-center items-center flex-col h-64">
      <p> Something went wrong</p>
      <OrangeBtn buttonAction="Retry" onClick={refetch} />
    </div>
  );
}

export default ErrorDisplayComponent;
