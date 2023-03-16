import React from "react";
import { useNavigate } from "react-router-dom";
import OrangeBtn from "../customButton/orangeBtn";

function ErrorDisplayComponent({ refetch }) {
  const navigate = useNavigate();
  const shouldGoBack = () => {
    navigate(-1);
  };
  return (
    <div className="m-auto w-full max-w-md flex justify-center items-center flex-col h-64">
      <p> Something went wrong</p>
      <OrangeBtn buttonAction="Retry" onClick={refetch ?? shouldGoBack} />
    </div>
  );
}

export default ErrorDisplayComponent;
