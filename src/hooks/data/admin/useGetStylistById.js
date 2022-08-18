import { useQuery } from "@tanstack/react-query";
import admin from "../../../api/admin";

export default (id) => {
  const { useGetStylistById } = admin;
  return useQuery(["stylists", id], () => useGetStylistById(id), {
    enabled: id !== undefined,
  });
};
