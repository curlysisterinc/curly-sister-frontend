import { useMutation } from "@tanstack/react-query";
import { queryClient } from "App";
import { useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { useAuthContext } from "redux/auth";
import admin from "../../../api/admin";

export default () => {
  const { addToast } = useToasts();
  const { AddVideoToContent } = admin;

  return useMutation((emailValue) => AddVideoToContent(emailValue), {
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

      // addToast(mainError.message, {
      //   appearance: "error",
      // });
    },
  });
};
