import { useMutation } from "@tanstack/react-query";
import onBoarding from "api/onBoarding";
import { queryClient } from "App";
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
  const { LogIn } = onBoarding;
  const navigate = useNavigate();

  return useMutation(({ password, userEmail }) => LogIn(userEmail, password), {
    onSuccess: (context) => {
      const { data } = context;
      addToast(data.message, {
        appearance: "success",
      });
      queryClient.fetchQuery(["profile"]);
      authHandler.setUserInfo(data.user);
      // JWT DECODE SETUP
      const accessToken = data.access_token;
      const refreshToken = data.refresh_token;
      Cookies.set("accessToken", accessToken);
      authHandler.handle(refreshToken);
      // const accessToken = res.access_token;
      // authHandler.handle(accessToken);
      dispatch(
        loginUser({
          ...data.user,
          token: accessToken,
          isSignedIn: true,
        })
      );
      const link = sessionStorage.getItem("link");
      sessionStorage.removeItem("link");
      return link ? navigate(link) : navigate(NonAuthRoutes.home);
    },
    onError: async (error) => {
      const mainError = error.response.data;

      addToast(mainError.message, {
        appearance: "error",
      });
    },
  });
};
