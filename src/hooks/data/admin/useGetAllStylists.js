import { useQuery } from "@tanstack/react-query";
import admin from "../../../api/admin";

export default () => {
  const { GetAllStylists } = admin;
  return useQuery(["stylists"], () => GetAllStylists());
};
