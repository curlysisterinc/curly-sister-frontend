import React from "react";

export function Loadersmall() {
  return (
    <div>
      <div
        style={{ borderTopColor: "transparent" }}
        className="w-5 h-5 border-2 border-purple-100 border-solid rounded-full animate-spin"
      />
    </div>
  );
}

function Loader() {
  return (
    <div className=" flex justify-center items-center">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-black" />
    </div>
  );
}

export default Loader;
