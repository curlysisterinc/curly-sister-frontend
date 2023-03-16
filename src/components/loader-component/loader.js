import React from "react";

export function Loadersmall({ color }) {
  return (
    <div>
      <div
        className={`w-5 h-5 border-2  border-solid rounded-full animate-spin ${
          color ? `border-${color}-600` : "border-purple-600"
        }`}
        style={{ borderTopColor: "transparent" }}
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
