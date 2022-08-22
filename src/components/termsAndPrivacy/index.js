import React, { useState } from "react";
import Layout from "components/layout";
import FooterComponent from "components/footer";

function TermsAndPrivacy() {
  const [active, setActive] = useState("terms");
  const toggleActive = (set) => {
    setActive(set);
  };
  return (
    <Layout>
      <div className="p-0">
        <div className="w-1/2 mx-auto my-10">
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
          <div className={active === "terms" ? "block mt-7" : "hidden"}>
            <h2 className="text-4xl text-gray-400 font-bold mb-10">
              Terms of use
            </h2>
            <p className="text-base text-gray-200 mb-6">
              Here’s where the text for the terms of use will go. I’ve gone
              ahead and filled it up with dummy text, but as it goes into
              production that will be eventually replaced with actual copy.
            </p>
            <p className="text-base text-gray-200 mb-10">
              Either the well was very deep, or she fell very slowly, for she
              had plenty of time as she went down to look about her and to
              wonder what was going to happen next. First, she tried to look
              down and make out what she was coming to, but it was too dark to
              see anything; then she looked at the sides of the well, and
              noticed that they were filled with cupboards and book-shelves;
              here and there she saw maps and pictures hung upon pegs.
            </p>
            <h3 className="text-3xl text-gray-400 font-bold mb-6">
              Disclaimer of warranties
            </h3>
            <p className="text-base text-gray-200 mb-6">
              Suddenly she came upon a little three-legged table, all made of
              solid glass; there was nothing on it except a tiny golden key, and
              Alice’s first thought was that it might belong to one of the doors
              of the hall; but, alas! either the locks were too large, or the
              key was too small, but at any rate it would not open any of them.
              However, on the second time round, she came upon a low curtain she
              had not noticed before, and behind it was a little door about
              fifteen inches high: she tried the little golden key in the lock,
              and to her great delight it fitted!
            </p>
            <p className="text-base text-gray-200 mb-6">
              Just then her head struck against the roof of the hall: in fact
              she was now more than nine feet high, and she at once took up the
              little golden key and hurried off to the garden door.
            </p>
          </div>

          {/* privacy */}
          <div className={active === "privacy" ? "block mt-7" : "hidden"}>
            <h2 className="text-4xl text-gray-400 font-bold mb-10">
              Privacy policy
            </h2>
            <p className="text-base text-gray-200 mb-6">
              Here’s where the text for the privacy policy will go. I’ve gone
              ahead and filled it up with dummy text, but as it goes into
              production that will be eventually replaced with actual copy.
            </p>
            <p className="text-base text-gray-200 mb-10">
              Either the well was very deep, or she fell very slowly, for she
              had plenty of time as she went down to look about her and to
              wonder what was going to happen next. First, she tried to look
              down and make out what she was coming to, but it was too dark to
              see anything; then she looked at the sides of the well, and
              noticed that they were filled with cupboards and book-shelves;
              here and there she saw maps and pictures hung upon pegs.
            </p>
            <h3 className="text-3xl text-gray-400 font-bold mb-6">
              Using information
            </h3>
            <p className="text-base text-gray-200 mb-6">
              Suddenly she came upon a little three-legged table, all made of
              solid glass; there was nothing on it except a tiny golden key, and
              Alice’s first thought was that it might belong to one of the doors
              of the hall; but, alas! either the locks were too large, or the
              key was too small, but at any rate it would not open any of them.
              However, on the second time round, she came upon a low curtain she
              had not noticed before, and behind it was a little door about
              fifteen inches high: she tried the little golden key in the lock,
              and to her great delight it fitted!
            </p>
            <p className="text-base text-gray-200 mb-6">
              Just then her head struck against the roof of the hall: in fact
              she was now more than nine feet high, and she at once took up the
              little golden key and hurried off to the garden door.
            </p>
          </div>
        </div>
        <FooterComponent />
      </div>
    </Layout>
  );
}

export default TermsAndPrivacy;
