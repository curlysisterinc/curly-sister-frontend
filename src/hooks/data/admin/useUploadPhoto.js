import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { useAuthContext } from "redux/auth";
import admin from "../../../api/admin";

export default () => {
  const { addToast } = useToasts();
  const { UploadPhoto } = admin;

  return useMutation((formdata) => UploadPhoto(formdata), {
    onSuccess: (context) => {
      const { data } = context;
      // addToast(data.message, {
      //   appearance: "success",
      // });
      // queryClient.invalidateQueries("gallery");
    },
    onError: async (error) => {
      // console.log(error.response.data.message);
      addToast(error?.response?.data?.message, {
        appearance: "error",
      });
    },
  });
};
