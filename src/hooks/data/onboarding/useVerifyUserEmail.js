import { useQuery } from "@tanstack/react-query";
import onBoarding from "api/onBoarding";
import { useToasts } from "react-toast-notifications";

export default (email) => {
  const { addToast } = useToasts();
  const { VerifyUserEmail } = onBoarding;

  return useQuery([email], () => VerifyUserEmail(email), {
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
    enabled: !!email,
  });
};
