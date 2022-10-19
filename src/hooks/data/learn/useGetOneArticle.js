import { useQuery } from "@tanstack/react-query";
import learn from "../../../api/learn";

export default (id) => {
  const { GetOneArticle } = learn;
  return useQuery(["articles", id], () => GetOneArticle(id), {
    enabled: !!id,
  });
};
