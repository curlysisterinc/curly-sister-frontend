import { useQuery } from "@tanstack/react-query";
import admin from "../../../api/admin";

export default () => {
  const { GetAllIndividuals } = admin;
  return useQuery(["individuals"], () => GetAllIndividuals(), {});
};
