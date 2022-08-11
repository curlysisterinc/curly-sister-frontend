import React from "react";
import { Loadersmall } from "../loader";

function OrangeBtn({ onClick, disabled, buttonAction, isloading }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || isloading}
      className="text-sm disabled:opacity-50 font-BeatriceSemiBold rounded-full bg-orange-200 py-2 px-8 text-white mt-5 flex items-center rotate gap-x-2"
    >
      {buttonAction}
      {isloading && <Loadersmall />}
    </button>
  );
}

export default OrangeBtn;
