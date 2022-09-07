import { useMutation } from "@tanstack/react-query";
import { useToasts } from "react-toast-notifications";
import utility from "../../../api/utility";

export default () => {
  const { addToast } = useToasts();
  const { Search } = utility;

  return useMutation((data) => Search(data), {
    onError: async (error) => {
      const mainError = error.response.data;

      addToast(mainError.message, {
        appearance: "error",
      });
    },
  });
};

// GetCertification
// GetTags
