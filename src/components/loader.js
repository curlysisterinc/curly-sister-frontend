import React from "react";

function Loader() {
  return (
    <div className=" flex justify-center items-center">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-black" />
    </div>
  );
}

export default Loader;
