import { useMutation } from "@tanstack/react-query";
import authHandler from "authHandler";
import { NonAuthRoutes } from "constants";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { useAuthContext } from "redux/auth";
import { loginUser } from "redux/auth/authSlice";
import admin from "../../../api/admin";

export default () => {
  const { dispatch } = useAuthContext();
  const { addToast } = useToasts();
  const { UpdateStylist } = admin;
  const navigate = useNavigate();

  return useMutation((updateValue) => UpdateStylist(updateValue), {
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
