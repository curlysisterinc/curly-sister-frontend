/* eslint-disable no-underscore-dangle */
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function useChangeBtnTitle(setButtonAction, setStylistValues) {
  const { state } = useLocation();
  const stylistId = localStorage.getItem("createdStylist");

  useEffect(() => {
    if (state?._id === undefined) {
      setStylistValues((prev) => ({ ...prev, id: stylistId }));
    }
    if (state?._id !== undefined) {
      setButtonAction("Edit");
    }
  }, []);
}

export default useChangeBtnTitle;
