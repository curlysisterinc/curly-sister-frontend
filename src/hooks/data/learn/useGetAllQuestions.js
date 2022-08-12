import { useQuery } from "@tanstack/react-query";
import learn from "../../../api/learn";

export default () => {
  const { GetAllQuestions } = learn;
  return useQuery(["questions"], () => GetAllQuestions());
};
