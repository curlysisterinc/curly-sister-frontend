import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function useChangeBtnTitle(tabtitle, setButtonAction, setData) {
  const stylistId = localStorage.getItem("createdStylist");
  const { state } = useLocation();

  useEffect(() => {
    const ac = new AbortController();
    if (state) {
      setButtonAction("Edit");
    }

    if (stylistId) {
      if (tabtitle !== "availablity" && tabtitle !== "gallery") {
        setData((prev) => ({ ...prev, id: stylistId }));
      }
      if (tabtitle === "gallery") {
        setData((prev) => ({
          ...prev,
          update: { ...prev.update, id: stylistId },
        }));
      }
      if (tabtitle === "availablity") {
        setData({ type: "ADD_STYLISTID", payload: stylistId });
      }
    }
    return function cleanup() {
      ac.abort();
    };
  }, []);
}

export default useChangeBtnTitle;
