import React, { useRef, useEffect } from "react";
import LoadingBar from "react-top-loading-bar";

function LoaderComponent() {
  const ref = useRef();

  useEffect(() => {
    // for the top loading bar
    ref?.current?.continuousStart();
  }, []);
  return (
    <div className="h-full overflow-hidden">
      <LoadingBar color="#590BA9" ref={ref} shadow height={4} />
      <div className="h-[100vh - 10px] mt-3 bg-purple-100 blur" />
    </div>
  );
}

export default LoaderComponent;
