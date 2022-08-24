import Layout from "components/layout";
import React from "react";
import { Link } from "react-router-dom";

export function PageNotFound() {
  return (
    <Layout>
      <div className="p-0">
        This page is not found, please click <Link to="/">here</Link> to go to
        the home page: ;
      </div>
    </Layout>
  );
}
