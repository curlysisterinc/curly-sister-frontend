import { useQuery } from "@tanstack/react-query";
import admin from "../../../api/admin";

export default () => {
  const { GetAllContents } = admin;
  return useQuery(["contents"], () => GetAllContents(), {});
};
