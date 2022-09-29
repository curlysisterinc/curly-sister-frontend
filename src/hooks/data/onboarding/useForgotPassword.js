import { useMutation } from "@tanstack/react-query";
import onBoarding from "api/onBoarding";
import authHandler from "authHandler";
import { NonAuthRoutes } from "constants";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { useAuthContext } from "redux/auth";
import { loginUser } from "redux/auth/authSlice";

export default () => {
  const { dispatch } = useAuthContext();
  const { addToast } = useToasts();
  const { ForgotPassword } = onBoarding;
  const navigate = useNavigate();

  return useMutation((userEmail) => ForgotPassword(userEmail), {
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
