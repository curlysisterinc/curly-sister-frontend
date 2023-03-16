import { useMutation } from "@tanstack/react-query";
import { queryClient } from "App";
import { useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { useAuthContext } from "redux/auth";
import learn from "../../../api/learn";

export default (id) => {
  const { addToast } = useToasts();
  const { DeleteVideoById } = learn;

  return useMutation(() => DeleteVideoById(id), {
    onSuccess: (context) => {
      const { data } = context;
      addToast(data.message, {
        appearance: "success",
      });
      queryClient.invalidateQueries(["videos"]);
      queryClient.invalidateQueries(["contents"]);
    },
    onError: async (error) => {
      const mainError = error.response.data;

      addToast(mainError.message, {
        appearance: "error",
      });
    },
  });
};
