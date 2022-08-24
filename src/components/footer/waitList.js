import React from "react";
import CommonCard from "../stylistCard";
import bgOne2 from "../../assets/images/bg-one2.png";

function WaitList({ getStylist }) {
  return (
    <div className="bg-orange-50 pt-4 pb-6 px-6 flex-col md:flex-row md:px-20 md:py-10 flex justify-between items-center relative ">
      <img
        className="absolute w-full object-fit top-0 z-0"
        src={bgOne2}
        alt=""
      />

      <div className="relative z-10 flex flex-col gap-0 md:grid grid-cols-12 md:gap-16">
        <div className="col-span-5">
          {getStylist &&
            [...getStylist]?.splice(0, 1)?.map((item) => {
              return <CommonCard key={item._id} stylist={item} />;
            })}
        </div>
        <div className="col-span-7 md:my-6 mt-6 mb-0">
          <p className="text-gray-300 text-xs mb:text-base mb-2">
            ARE YOU A STYLIST?
          </p>
          <h3 className="font-GTSuperTextBlack md:text-4xl text-gray-200 md:mb-2 mb-3 font-black text-2xl">
            It’s time to get listed
          </h3>
          <p className="text-gray-200 md:text-base line-clamp-3 font-normal text-sm mb-4 md:mb-0">
            Join our database of over 10,000+ stylists around the world so new
            clients can easily find you.
          </p>
          <div className="md:pt-10 p-0 mt-4">
            <a
              href="https://hevxcdnqqzt.typeform.com/to/dPCDRkOk?typeform-source=curlysister.com"
              className="rounded-full bg-purple-100 w-120 md:w-44 px-6 py-3.5 md:py-4 text-white font-BeatriceSemiBold font-semibold text-sm md:text-base inline-block"
            >
              Get listed
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WaitList;
