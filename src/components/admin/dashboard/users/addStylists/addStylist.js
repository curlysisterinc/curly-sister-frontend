import React from "react";
import { useStylistPage } from "./stylistPage";

export function AddStylist() {
  const stylistpage = useStylistPage();
  return stylistpage.renderPage({ mode: "ADD", stylistData: {} });
}

export default AddStylist;
