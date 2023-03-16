import { useQuery } from "@tanstack/react-query";
import admin from "../../../api/admin";

export default () => {
  const { GetServices } = admin;
  return useQuery(["services"], () => GetServices(), {});
};
