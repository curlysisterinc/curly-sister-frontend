import { useQuery } from "@tanstack/react-query";
import learn from "../../../api/learn";

export default (id) => {
  const { GetCommentForArticle } = learn;
  return useQuery(
    ["articles", id, "comments"],
    () => GetCommentForArticle(id),
    {
      enabled: !!id,
    }
  );
};
