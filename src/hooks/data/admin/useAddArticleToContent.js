import { useMutation } from "@tanstack/react-query";
import { queryClient } from "App";
import { useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { useAuthContext } from "redux/auth";
import admin from "../../../api/admin";

export default () => {
  const { addToast } = useToasts();
  const { AddArticleToContent } = admin;

  return useMutation((emailValue) => AddArticleToContent(emailValue), {
    onSuccess: (context) => {
      const { data } = context;
      // addToast(data.message, {
      //   appearance: "success",
      // });
      queryClient.invalidateQueries(["articles"]);
      queryClient.invalidateQueries(["contents"]);
    },
    onError: async (error) => {
      const mainError = error?.response?.data || error?.response?.data?.message;
      addToast(mainError?.message || "error", {
        appearance: "error",
      });
    },
  });
};
