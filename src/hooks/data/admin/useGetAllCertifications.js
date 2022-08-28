import { useQuery } from "@tanstack/react-query";
import admin from "../../../api/admin";

export default () => {
  const { GetCertification } = admin;
  return useQuery(["certifications"], () => GetCertification(), {});
};

// GetCertification
// GetTags
