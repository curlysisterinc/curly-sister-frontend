import { useMutation, useQuery } from "@tanstack/react-query";
import utility from "../../../api/utility";

export default () => {
  const { GetExternalVideoData } = utility;
  return useMutation(["videoData"], (link) => GetExternalVideoData(link), {});
};
