import { useQuery } from "@tanstack/react-query";
import learn from "../../../api/learn";

export default (id) => {
  const { GetCommentForVideo } = learn;
  return useQuery(["videos", id, "comments"], () => GetCommentForVideo(id), {
    enabled: !!id,
  });
};
