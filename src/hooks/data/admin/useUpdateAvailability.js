import { useMutation } from "@tanstack/react-query";
import { useToasts } from "react-toast-notifications";
import admin from "../../../api/admin";
import { queryClient } from "../../../App";

export default () => {
  const { addToast } = useToasts();
  const { UpdateAvailability } = admin;

  return useMutation(
    (availabilityData) => UpdateAvailability(availabilityData),
    {
      onSuccess: (context) => {
        const { data } = context;
        addToast(data.message, {
          appearance: "success",
        });
        queryClient.invalidateQueries("availability");
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
