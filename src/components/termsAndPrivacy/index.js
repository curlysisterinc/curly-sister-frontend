import React, { useState } from "react";
import Layout from "components/layout";
import FooterComponent from "components/footer";
import BecomeStylistSection from "components/about/becomeStylist";
import { Terms } from "./terms";
import { Privacy } from "./privacy";

function TermsAndPrivacy() {
  const [active, setActive] = useState("terms");
  const toggleActive = (set) => {
    setActive(set);
  };
  return (
    // <Layout>
    <div className="p-0">
      <div className="w-full mx-auto p-5 mb-20 mt-12 max-w-1031">
        <div className="flex justify-start items-start">
          <button
            type="button"
            onClick={() => toggleActive("terms")}
            className={
              active === "terms"
                ? "text-purple-100 font-semibold border-b-2 border-purple-100 pb-2 mr-8"
                : "text-gray-200 mr-8"
            }
          >
            Terms of use
          </button>
          <button
            type="button"
            onClick={() => toggleActive("privacy")}
            className={
              active === "privacy"
                ? "text-purple-100 font-semibold border-b-2 border-purple-100 pb-2"
                : "text-gray-200"
            }
          >
            Privacy
          </button>
        </div>
        {/* terms */}
        <Terms isActive={active === "terms"} />
        <Privacy isActive={active === "privacy"} />
      </div>
      <FooterComponent />
    </div>
    // </Layout>
  );
}

export default TermsAndPrivacy;
