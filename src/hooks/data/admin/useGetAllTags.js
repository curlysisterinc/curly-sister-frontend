import { useQuery } from "@tanstack/react-query";
import admin from "../../../api/admin";

export default () => {
  const { GetTags } = admin;
  return useQuery(["tags"], () => GetTags(), {});
};

// GetCertification
// GetTags
