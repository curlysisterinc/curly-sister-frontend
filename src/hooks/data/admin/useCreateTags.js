import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { useAuthContext } from "redux/auth";
import admin from "../../../api/admin";

export default () => {
  const { addToast } = useToasts();
  const { CreateTags } = admin;

  return useMutation((tagValues) => CreateTags(tagValues), {
    onSuccess: (context) => {
      const { data } = context;
      addToast(data.message, {
        appearance: "success",
      });
    },
    onError: async (error) => {
      const mainError = error.response.data;

      addToast(mainError.message, {
        appearance: "error",
      });
    },
  });
};
