import React from "react";
import Image from "components/image";
import course from "../../../../assets/images/course-bg.png";
import more from "../../../../assets/images/there's-more.png";
import FooterComponent from "../../../footer/footer";
import { PopularVideoSection } from "./PopularVideoSection";
import { FeaturedArticleSection } from "./FeaturedArticleSection";
import { CommunityQuestionSection } from "./CommunityQuestionSection";

function AllTab() {
  return (
    <div>
      <div className="px-10">
        <PopularVideoSection />
        <FeaturedArticleSection />
        <CommunityQuestionSection />

        <div className="grid grid-cols-2 gap-6 mb-20 h-auto">
          <div className="bg-orange-50 border border-orange-150 h-full rounded-xl relative overflow-hidden">
            <div className="flex flex-col h-full justify-center relative">
              <div className="w-2/3 pl-10">
                <h2 className="text-gray-400 text-2xl font-bold mb-2 font-GTSuperText">
                  There's more
                </h2>
                <p className="text-gray-200 text-sm font-normal">
                  It was high time to go, for the pool was getting quite crowded
                </p>
                <a
                  href="/"
                  className="text-white inline-block rounded-3xl bg-gray-400 text-sm font-semibold px-4 py-2 mt-3"
                >
                  Visit blog
                </a>
              </div>
              <div className="w-5/5 absolute  h-full bottom-5 top-4 -right-10">
                <Image
                  src={more}
                  alt="shocked woman"
                  className="w-full object-cover h-full top-0 z-200"
                />
              </div>
            </div>
          </div>
          <div className="bg-purple-200 rounded-xl relative overflow-hidden">
            <div className="flex flex-col h-full justify-center relative py-10">
              <div className="w-55 pl-10">
                <h2 className="text-white text-2xl font-bold leading-9 mb-2 font-GTSuperText">
                  Here&#39;s the name of the course
                </h2>
                <p className="text-white text-opacity-80 text-sm font-normal">
                  Luckily for her, the little magic bottle had now had its
                  effect
                </p>
                <a
                  href="/"
                  className="text-white inline-block rounded-3xl bg-purple-100 text-sm font-semibold px-4 py-2 mt-3"
                >
                  View courses
                </a>
              </div>
              <div className="w-5/5 absolute  h-full bottom-5 top-4 -right-10">
                <Image
                  src={course}
                  alt="shocked woman"
                  className="w-full object-cover h-full "
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterComponent />
    </div>
  );
}

export default AllTab;
