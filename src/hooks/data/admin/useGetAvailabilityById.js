import { useQuery } from "@tanstack/react-query";
import admin from "../../../api/admin";

export default (id) => {
  const { GetAvailabilityById } = admin;
  return useQuery(["availability", id], () => GetAvailabilityById(id), {
    enabled: !!id,
  });
};
