import React, { useEffect, useState } from "react";
import { useToasts } from "react-toast-notifications";

export default () => {
  const { addToast } = useToasts();
  const [status, setStatus] = useState("");
  const [position, setPosition] = useState({
    lat: null,
    lng: null,
  });
  useEffect(() => {
    const ac = new AbortController();
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser");
      addToast("Geolocation is not supported by your browser", {
        appearance: "error",
      });
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
          addToast(
            "Unable to retrieve your location, please ensure your location is turned on and location permission is granted",
            {
              appearance: "error",
            }
          );
        }
      );
    }
    return function cleanup() {
      ac.abort();
    };
  }, []);
  return { status, position };
};
