import { useMutation } from "@tanstack/react-query";
import onBoarding from "api/onBoarding";
import { NonAuthRoutes } from "constants";
import { useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import authHandler from "authHandler";
import Cookies from "js-cookie";
import { useAuthContext } from "redux/auth";
import { loginUser } from "redux/auth/authSlice";

export default () => {
  const { dispatch } = useAuthContext();
  const { addToast } = useToasts();
  const { SignUp } = onBoarding;
  const navigate = useNavigate();

  return useMutation(
    ({ password, userEmail, firstName, lastName }) =>
      SignUp(userEmail, password, firstName, lastName),
    {
      onSuccess: (context) => {
        const { data } = context;
        addToast("SignUp Successful", {
          appearance: "success",
        });

        navigate(NonAuthRoutes.home);
      },
      onError: async (error) => {
        const mainError = error.response.data;
        addToast(mainError.message, {
          appearance: "error",
        });
      },
    }
  );
};
