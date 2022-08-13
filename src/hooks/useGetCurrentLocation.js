import React, { useEffect, useState } from "react";

export default () => {
  const [status, setStatus] = useState("");
  const [position, setPosition] = useState({
    lat: null,
    lng: null,
  });
  useEffect(() => {
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser");
    } else {
      setStatus("Locating...");
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const result = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          };
          setPosition(result);
          setStatus("data");
        },
        () => {
          setStatus("Unable to retrieve your location");
        }
      );
    }
  }, []);
  return { status, position };
};
