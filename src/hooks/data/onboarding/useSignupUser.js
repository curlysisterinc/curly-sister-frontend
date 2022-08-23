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
        addToast("Signin Successful", {
          appearance: "success",
        });

        authHandler.setUserInfo(data.user);
        // JWT DECODE SETUP
        const accessToken = data.jwtToken;
        const refreshToken = data.refresh_token;
        Cookies.set("accessToken", accessToken);
        authHandler.handle(refreshToken);
        // const accessToken = res.access_token;
        // authHandler.handle(accessToken);
        dispatch(
          loginUser({
            token: accessToken,
            isSignedIn: true,
          })
        );
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
