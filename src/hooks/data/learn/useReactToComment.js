/* eslint-disable no-param-reassign */
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "App";
import { useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { useAuthContext } from "redux/auth";
import learn from "../../../api/learn";

export default (id) => {
  const { addToast } = useToasts();
  const {
    state: { _id: userId },
  } = useAuthContext();
  const { ReactToComment } = learn;
  return useMutation(
    ({ commentId, reaction }) => ReactToComment({ commentId, reaction }),
    {
      // When mutate is called:
      onMutate: async (variables) => {
        // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
        // await queryClient.cancelQueries(["questions", id, "comments"]);

        // Snapshot the previous value
        const previousComments = queryClient.getQueryData([
          "questions",
          id,
          "comments",
        ]).data.data;

        if (!variables.isCommentReply) {
          const newComments = previousComments.map((item) => {
            const isLikesPresent = item.likes.find(
              (like) => like === userId && item._id === variables.commentId
            );

            const isUnLikePresent = item.unlikes.find(
              (unlike) => unlike === userId && item._id === variables.commentId
            );

            if (item._id === variables.commentId) {
              if (variables.reaction === "like") {
                // find the comment, add it if it is not present or remove it if it is present
                if (isUnLikePresent?.length) {
                  const newUnlikes = item.unlikes.filter(
                    (unlike) => unlike === !userId
                  );
                  const newLikes = [...item.likes, userId];
                  return { ...item, likes: newLikes, unlikes: newUnlikes };
                }
                if (isLikesPresent?.length) {
                  const newLikes = item.likes.filter(
                    (like) => like === !userId
                  );
                  return { ...item, likes: newLikes };
                }
                if (!isLikesPresent?.length && !isUnLikePresent?.length) {
                  return { ...item, likes: [...item.likes, userId] };
                }
                return item;
              }
              // find the comment, add it if it is not present or remove it if it is present

              if (isLikesPresent?.length) {
                const newLikes = item.likes.filter((like) => like === !userId);
                const newUnLikes = [...item.unlikes, userId];
                return { ...item, likes: newLikes, unlikes: newUnLikes };
              }
              if (isUnLikePresent?.length) {
                const newUnlikes = item.unlikes.filter(
                  (unlike) => unlike === !userId
                );
                return { ...item, unlikes: newUnlikes };
              }
              if (!isLikesPresent?.length && !isUnLikePresent?.length) {
                return { ...item, unlikes: [...item.unlikes, userId] };
              }
              return item;
            }
            return item;
          });

          queryClient.setQueryData(["questions", id, "comments"], (oldData) => {
            return { ...oldData, data: { data: [...newComments] } };
          });
        }

        // Return a context object with the snapshotted value
        return { previousComments };
      },

      onSettled: () => {
        queryClient.invalidateQueries(["questions", id, "comments"]);
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
    }
  );
};
