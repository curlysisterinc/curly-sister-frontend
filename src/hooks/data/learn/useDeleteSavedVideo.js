import { useMutation } from "@tanstack/react-query";
import { queryClient } from "App";
import { useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { useAuthContext } from "redux/auth";
import learn from "../../../api/learn";

export default (savedVideoId) => {
  const { addToast } = useToasts();
  const { DeleteSavedVideo } = learn;

  return useMutation(() => DeleteSavedVideo(savedVideoId), {
    onSuccess: (context) => {
      const { data } = context;
      addToast(data.message, {
        appearance: "success",
      });
      queryClient.invalidateQueries(["videos"]);
    },
    onError: async (error) => {
      const mainError = error.response.data;

      addToast(mainError.message.message, {
        appearance: "error",
      });
    },
  });
};
