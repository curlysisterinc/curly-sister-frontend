import { useMutation } from "@tanstack/react-query";
import { queryClient } from "App";
import { useNavigate } from "react-router-dom";
// import { useToasts } from "react-toast-notifications";
import { useAuthContext } from "redux/auth";
import onBoarding from "../../../api/onBoarding";

export default () => {
  // const { addToast } = useToasts();
  const { inviteAdmin } = onBoarding;

  return useMutation((emailValue) => inviteAdmin(emailValue), {
    onSuccess: (context) => {
      const { data } = context;
      // addToast(data.message, {
      //   appearance: "success",
      // });
      queryClient.invalidateQueries(["admins"]);
    },
    onError: async (error) => {
      const mainError = error.response.data;

      // addToast(mainError.message, {
      //   appearance: "error",
      // });
    },
  });
};
