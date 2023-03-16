import { useQuery } from "@tanstack/react-query";
import onBoarding from "../../../api/onBoarding";

export default () => {
  const { GetUserProfile } = onBoarding;
  return useQuery(["profile"], () => GetUserProfile(), {});
};
