import { useQuery } from "@tanstack/react-query";
import admin from "../../../api/admin";

export default () => {
  const { GetAllAdmin } = admin;
  return useQuery(["admins"], () => GetAllAdmin(), {});
};
