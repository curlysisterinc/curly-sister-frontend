import { useMutation } from "@tanstack/react-query";
import { queryClient } from "App";
import authHandler from "authHandler";
import { useParams, useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { useAuthContext } from "redux/auth";
import admin from "../../../api/admin";

export default () => {
  const { dispatch } = useAuthContext();
  const { addToast } = useToasts();
  const { UpdateStylist } = admin;
  const { id } = useParams();

  return useMutation((updateValue) => UpdateStylist(updateValue), {
    onSuccess: (context) => {
      const { data } = context;
      addToast(data.message, {
        appearance: "success",
      });
      queryClient.invalidateQueries(["services", id]);
    },
    onError: async (error) => {
      const mainError = error.response.data;

      addToast(mainError.message, {
        appearance: "error",
      });
    },
  });
};
