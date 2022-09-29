import { useMutation } from "@tanstack/react-query";
import onBoarding from "api/onBoarding";
import { useToasts } from "react-toast-notifications";

export default () => {
  const { addToast } = useToasts();
  const { ResetPassword } = onBoarding;

  return useMutation((data) => ResetPassword(data), {
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
