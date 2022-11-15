import { useMutation } from "@tanstack/react-query";
import { queryClient } from "App";
import { useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { useAuthContext } from "redux/auth";
import learn from "../../../api/learn";

export default (id, type) => {
  const { addToast } = useToasts();
  const { DeleteComment } = learn;

  return useMutation(({ commentId }) => DeleteComment(commentId), {
    onSuccess: (context) => {
      const { data } = context;
      // addToast(data.message, {
      //   appearance: "success",
      // });
      queryClient.invalidateQueries([type, id, "comments"]);
    },
    onError: async (error) => {
      const mainError = error.response.data;
      let errorToDisplay = mainError?.message;
      if (typeof mainError?.message !== "string") {
        errorToDisplay = mainError?.message?.message;
      }
      addToast(errorToDisplay, {
        appearance: "error",
      });
    },
  });
};
