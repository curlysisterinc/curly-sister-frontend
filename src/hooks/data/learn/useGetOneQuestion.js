import { useQuery } from "@tanstack/react-query";
import learn from "../../../api/learn";

export default (id) => {
  const { GetOneQuestion } = learn;
  return useQuery(["questions", id], () => GetOneQuestion(id), {
    enabled: !!id,
  });
};
