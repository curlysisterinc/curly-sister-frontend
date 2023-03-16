import { useQuery } from "@tanstack/react-query";
import admin from "../../../api/admin";

export default (id) => {
  const { GetStylistById } = admin;
  return useQuery(["stylists", id], () => GetStylistById(id), {
    enabled: !!id,
  });
};
