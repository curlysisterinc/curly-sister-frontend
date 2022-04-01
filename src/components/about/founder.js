import React from "react";
import founderImg from "../../assets/images/founder.png";

function FounderSection() {
  return (
    <div className="bg-gray-50 p-10 flex justify-between items-center">
      <div>
        <div className="grid grid-cols-12 w-full">
          <h5 className="col-span-4 uppercase text-base text-gray-300">
            founders note
          </h5>
          <hr className="border border-orange-100 col-span-8 mt-3" />
        </div>
        <h2 className="text-4xl text-gray-400 font-bold my-8">Meet Pheobe</h2>
        <p className="w-9/12 text-gray-200">
          I am an HBCU and Executive MBA graduate living as an expatriate in
          Berlin, Germany. I am also a 19 year veteran of Microsoft where I
          built a career in Software Engineering and Product Management.
        </p>
        <p className="mt-8 w-9/12 text-gray-200">
          {" "}
          I did this all while managing a family and transitioning to wearing my
          hair natural while operating in a corporate space, deeply I
          <strong> understand the experiences</strong> of people with textured
          hair. My goal is to
          <strong> turn this struggle</strong> into a journey that benefits
          stylists and customers alike.
        </p>
      </div>
      <img src={founderImg} alt="founder-img" />
    </div>
  );
}

export default FounderSection;
