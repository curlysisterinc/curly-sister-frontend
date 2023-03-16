import { useQuery } from "@tanstack/react-query";
import learn from "../../../api/learn";

export default (id) => {
  const { GetOneVideo } = learn;
  return useQuery(["videos", id], () => GetOneVideo(id), {
    enabled: !!id,
  });
};
