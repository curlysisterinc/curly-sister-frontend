import { useQuery } from "@tanstack/react-query";
import learn from "../../../api/learn";

export default (id) => {
  const { GetCommentForQuestion } = learn;
  return useQuery(
    ["questions", id, "comments"],
    () => GetCommentForQuestion(id),
    {
      enabled: !!id,
    }
  );
};
